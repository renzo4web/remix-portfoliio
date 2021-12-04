import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
require("dotenv").config();
import contentful from "contentful";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";

type IndexData = {
	resources: Array<{ name: string; url: string }>;
	demos: Array<{ name: string; to: string }>;
};

const client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE_ID || "",
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
	let data: IndexData = {
		resources: [
			{
				name: "Remix Docs",
				url: "https://remix.run/docs",
			},
			{
				name: "React Router Docs",
				url: "https://reactrouter.com/docs",
			},
			{
				name: "Remix Discord",
				url: "https://discord.gg/VBePs6d",
			},
		],
		demos: [
			{
				to: "demos/actions",
				name: "Actions",
			},
			{
				to: "demos/about",
				name: "Nested Routes, CSS loading/unloading",
			},
			{
				to: "demos/params",
				name: "URL Params and Error Boundaries",
			},
		],
	};

	try {
		const response = await client.getEntries();
		return json(response.items);
	} catch (error) {
		return json(data);
	}
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
	return {
		title: "Remix Starter",
		description: "Welcome to remix!",
	};
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
	let data = useLoaderData<any[]>();

	console.log(data[3].fields);

	return (
		<div>
			<main>
				<h2>Welcome to Remix!</h2>
				<p>We're stoked that you're here. 🥳</p>
				<h2>Demos In This App</h2>
				<SimpleGrid minChildWidth="200px" columns={2} spacing={10}>
					{data.map(({ sys, fields }) => (
						<Box key={sys.id} bg="tomato">
							{fields.title}
							{!!fields.heroImg && (
								<Img boxSize="200px" src={`https:${fields.heroImg.fields.file.url}`} />
							)}
						</Box>
					))}
				</SimpleGrid>
			</main>
		</div>
	);
}
