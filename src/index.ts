import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { stitchSchemas } from "@graphql-tools/stitch";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";

async function makeGatewaySchema() {
  // Get subschema
  const inventorySchema = await loadSchema("http://localhost:4001/graphql", {
    loaders: [new UrlLoader()],
  });

  return stitchSchemas({
    subschemas: [
      {
        schema: inventorySchema,
      },
    ],
  });
}

const app = async () => {
  const schema = await makeGatewaySchema();
  const server = express();
  server.use(
    "/graphql",
    graphqlHTTP((req) => ({
      schema,
      context: { authHeader: req.headers.authorization },
      graphiql: true,
    }))
  );
  server.listen(4000, () =>
    console.log("gateway running at http://localhost:4000/graphql")
  );
};

export default app();
