import type {MetaFunction, LinksFunction} from "remix";
import stylesUrl from "~/styles/demos/about.css";
import {json, LoaderFunction, Outlet, useLoaderData, Link as RemixLink} from "remix";
import {contentfulApi} from "../contentful-api";
// @ts-ignore
import {ContentfulItems} from "../types/Contentful";
import {Box, List, ListIcon, ListItem, Wrap, WrapItem,Link} from "@chakra-ui/react";
import {FaProjectDiagram} from "react-icons/fa"


export let meta: MetaFunction = () => {
    return {
        title: "All Projects"
    };
};

export let links: LinksFunction = () => {
    return [{rel: "stylesheet", href: stylesUrl}];
};


export let loader: LoaderFunction = async ({params}) => {

    const client = contentfulApi()


    const entries = await client.getEntries()

    console.log(params)
    return json(entries.items);
};

const Index = () => {
    let items = useLoaderData<ContentfulItems[]>();

    return (
        <div>
            <h1>These are my projects</h1>
            <Wrap spacing={'20px'} align={'center'}>
                {items.map(({fields,sys}) => (
                    <WrapItem minW={'200px'} bg="#2b2d42"  key={sys.id} p={20}>
                        <Link as={RemixLink} color={'white'}  to={`${fields.slug}`}>{fields.title}</Link>
                    </WrapItem>
                ))}
            </Wrap>
            <Outlet/>
        </div>
    );
};

export default Index;