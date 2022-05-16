# hooskek-web

This is simple web presenting results of Sokol Skuhrov competitions build with Next.js

## Getting Started

### Install dependencies

```bash
yarn install
```

### Configure AWS S3 credentials
Race results are stored on AWS S3 instance. Configure AWS S3 credentials in .env.local file.

- copy .env.example file into .env.local
```bash
cp .env.example .env.local
```

- configure valid `AWS_S3_BUCKET_ACCESS_KEY`, `AWS_S3_BUCKET_SECRET_KEY`. `AWS_S3_BUCKET_NAME` environment variables


### Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run tests

```bash
yarn test
```

## Upload new results

Run this curl command (you will have to change api key parameter and path to your results.yaml file):

```
curl --data-binary "@/path/to/results.yaml" \
     -H "Content-Type: application/yaml" \
     -H "Api-Key: key" \
     http://localhost:3000/api/results
```

Server will respond with HTTP status 200 and following json body in case of successful upload:
```
{"success":true}
```

Upload of results with the same race name and race date will overwrite existing results in the S3 storage.
