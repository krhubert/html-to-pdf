# html-to-pdf

This is a lambda service that transform html webpage to pdf with puppeteer.

## deploy

Install node and serverless framework [guide](https://serverless.com/framework/docs/providers/aws/guide/installation/). Then run:

```
npm install
npm deploy
```

## usage

```
curl --request POST -d '{"html": "<html><body>Hello</body></html>"}' --header "Content-Type: application/json" https://<id>.execute-api.<region>.amazonaws.com/production/topdf
```
