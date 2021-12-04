import {createClient} from "contentful";
import dotenv from "dotenv"

dotenv.config()

export const contentfulApi = () => {


    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID || "",
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
    });

    return client
}