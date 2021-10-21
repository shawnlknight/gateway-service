import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { stitchSchemas } from "@graphql-tools/stitch";
import localSchema from "./services/local/schema";

async function makeGatewaySchema() {
  return stitchSchemas({
    subschemas: [
      {
        schema: localSchema,
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
