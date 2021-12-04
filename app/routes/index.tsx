import type {MetaFunction, LoaderFunction, LinksFunction} from "remix";
import {useLoaderData, json, Link} from "remix";
import {Box, SimpleGrid} from "@chakra-ui/layout";


type IndexData = {
    resources: Array<{ name: string; url: string }>;
    demos: Array<{ name: string; to: string }>;
};


import stylesUrl from "~/styles/demos/about.css";
import {contentfulApi} from "../contentful-api";
import {ContentfulItems} from "../types/Contentful";
import {Heading} from "@chakra-ui/react";


export let links: LinksFunction = () => {
    return [{rel: "stylesheet", href: stylesUrl}];
};


// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {

    const client = contentfulApi()


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

    const entries = await client.getEntries()

    return json(entries.items);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
    return {
        title: "Renzo4web",
        description: "Welcome to my Portfolio",
    };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
    let items = useLoaderData<ContentfulItems[]>();

    console.log(items)

    return (
        <div>
            <main>
                <h2>Welcome to My Portfolio</h2>
                <p> This is what I can do 🥳</p>
                <h2>Projects</h2>
                <SimpleGrid my={10} minChildWidth="200px" columns={2} spacing={15}>
                    {items.filter(item => item.fields.tags === "selected").map(({
                                                                                    sys,
                                                                                    fields
                                                                                }) => (
                        <Box key={sys.id} bg="black" color={'white'} borderRadius={5} width={'100%'}
                             p={20}>
                            <Heading as='h3' style={{textAlign: 'center'}} size='xs'>
                                {fields.title}
                            </Heading>


                            <p>
                                {fields.description}
                            </p>
                            <a href={fields.linkDemo}>Demo</a>
                        </Box>
                    ))}
                </SimpleGrid>


                <SimpleGrid minChildWidth="200px" my={10} columns={2} spacing={10}>
                    {items.filter(item => item.fields.tags === "mobile").map(({
                                                                                  sys,
                                                                                  fields
                                                                              }) => (
                        <Box key={sys.id} bg="tomato" width={'100%'} padding={10}>
                            {fields.title}
                            <p>
                                {fields.description}
                            </p>
                        </Box>
                    ))}
                </SimpleGrid>


            </main>
        </div>
    );
}


