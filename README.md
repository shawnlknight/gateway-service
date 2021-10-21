# GraphQL Gateway

Serves as a GraphQL gateway (proxy) to stitch subschemas into one unified graph.

Uses [graphql-tools schema stitching](https://www.graphql-tools.com/docs/schema-stitching/stitch-combining-schemas#combining-schemas).

## Getting Started

```sh
git clone git@github.com:shawnlknight/gateway-service.git
cd gateway-service
npm i
npm run dev
```

You should see the following output: `gateway running at http://localhost:4000/graphql`

### Running gateway with subschema services

This gateway service works by stitching in subschema services and represents it as one unified graph to a client.

#### Subschema services

- [https://github.com/shawnlknight/subschema-service](https://github.com/shawnlknight/subschema-service)

Clone the above repo(s), run locally, and you should be able to start running queries against [http://localhost:4000/graphql](http://localhost:4000/graphql).

Example query:

```gql
query {
  company(id: 2) {
    name
    products {
      name
    }
  }
}
```

Returns:

```json
{
  "data": {
    "company": {
      "name": "Vans",
      "products": [
        {
          "name": "Old School Pro"
        },
        {
          "name": "Sk8 Hi"
        }
      ]
    }
  }
}
```
