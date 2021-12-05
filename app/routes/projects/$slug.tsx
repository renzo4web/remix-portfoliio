import { useCatch, Link, json, useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import {contentfulApi} from "../../contentful-api";
// @ts-ignore
import {ContentfulItems} from "../../types/Contentful";

export let loader: LoaderFunction = async ({ params }) => {


    if (params.id === "this-record-does-not-exist") {
        throw new Response("Not Found", { status: 404 });
    }

    const client = contentfulApi()
    const entries = await client.getEntries()

    const data = entries.items as ContentfulItems[]

   const project =  data.find(el => el.fields.slug === params.slug)

    if( project === undefined) {
        throw new Response("Not Found", { status: 404 });
    }

    return  project
};

export default function Index() {

    let data = useLoaderData<ContentfulItems>();


    return (
        <h1>
            The project is <i style={{ color: "red" }}>{JSON.stringify(data.fields.title,null,2)}</i>
        </h1>
    );
}

// https://remix.run/api/conventions#catchboundary
// https://remix.run/api/remix#usecatch
// https://remix.run/api/guides/not-found
export function CatchBoundary() {
    let caught = useCatch();

    let message: React.ReactNode;
    switch (caught.status) {
        case 401:
            message = (
                <p>
                    Looks like you tried to visit a page that you do not have access to.
                    Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
                </p>
            );
        case 404:
            message = (
                <p>Looks like you tried to visit a page that does not exist.</p>
            );
        default:
            message = (
                <p>
                    There was a problem with your request!
                    <br />
                    {caught.status} {caught.statusText}
                </p>
            );
    }

    return (
        <>
            <h2>Oops!</h2>
            <p>{message}</p>
            <p>
                (Isn't it cool that the user gets to stay in context and try a different
                link in the parts of the UI that didn't blow up?)
            </p>
        </>
    );
}

// https://remix.run/api/conventions#errorboundary
// https://remix.run/api/guides/not-found
export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    return (
        <>
            <h2>Error!</h2>
            <p>{error.message}</p>
            <p>
                (Isn't it cool that the user gets to stay in context and try a different
                link in the parts of the UI that didn't blow up?)
            </p>
        </>
    );
}

export let meta: MetaFunction = ({ data }) => {
    return {
        title: data ? `Param: ${data.param}` : "Oops..."
    };
};