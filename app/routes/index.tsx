import type {MetaFunction, LoaderFunction, LinksFunction} from "remix";
import {useLoaderData, json, Link, Outlet, useParams} from "remix";
import {Box, SimpleGrid} from "@chakra-ui/layout";


type IndexData = {
    resources: Array<{ name: string; url: string }>;
    demos: Array<{ name: string; to: string }>;
};


import stylesUrl from "~/styles/demos/about.css";
import {contentfulApi} from "../contentful-api";
// @ts-ignore
import {ContentfulItems} from "../types/Contentful";
import {Center, Heading} from "@chakra-ui/react";


export let links: LinksFunction = () => {
    return [{rel: "stylesheet", href: stylesUrl}];
};


export let loader: LoaderFunction = async ({params}) => {

    const client = contentfulApi()


    const entries = await client.getEntries()

    console.log(params)
    return json(entries.items);
};

export let meta: MetaFunction = () => {
    return {
        title: "Renzo4web",
        description: "Welcome to my Portfolio",
    };
};

export default function Home() {
    let items = useLoaderData<ContentfulItems[]>();

    return (
        <div>
            <main>
                <Center display={'flex'} flexDir={'column'}>
                    <h2>Welcome to My Portfolio</h2>
                    <p> This is what I can do 🥳</p>
                </Center>
                <h2>Web</h2>
                <SimpleGrid my={10} minChildWidth="350px" columns={2} spacing={15}>
                    {items.filter(item => item.fields.tags === "selected").map(({
                                                                                    sys,
                                                                                    fields
                                                                                }) => (
                        <Box key={sys.id} display={'flex'} flexDir={'column'}
                             borderRadius='5px' width={'100%'}
                             borderWidth="1px"
                             borderColor='#000'
                             borderStyle={"solid"}
                             boxShadow='outline'
                             p={20}>
                            <Heading as='h3' my={0} style={{textAlign: 'center'}} size='xs'>
                                {fields.title}
                            </Heading>
                            <p>
                                {fields.description}
                            </p>
                            <Box mt={'auto'}>
                                <a href={fields.linkDemo}>Demo</a>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>


                <h2>Mobile</h2>
                <SimpleGrid minChildWidth="200px" my={10} columns={2} spacing={10}>
                    {items.filter(item => item.fields.tags === "mobile").map(({
                                                                                  sys,
                                                                                  fields
                                                                              }) => (
                        <Box key={sys.id} bg="#2b2d42" color={'white'} width={'100%'} padding={10}>
                            <Heading as='h3' my={0} style={{textAlign: 'center'}} size='xs'>
                                {fields.title}
                            </Heading>
                            <p>
                                {fields.description}
                            </p>
                        </Box>
                    ))}
                </SimpleGrid>


                <Box my={'2em'}>
                    <Link to={'projects'}>
                        <Heading  as='h3' my={0} style={{textAlign: 'center'}} size='md'>
                            All Projects
                        </Heading>
                    </Link>
                </Box>


                <Outlet/>
            </main>
        </div>
    );
}


