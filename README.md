# I Love Ice Cream

## Goal

The ask here is to, using the Yelp Fusion API,

1. Find the top 5 ice cream shops in Alpharetta
2. Include:
   1. Business name
   2. Business address
   3. Excerpt from a review of that business
   4. Name of the person who wrote the review
   5. Order the same as the API response

### Other stuff I've done here

I could have used the Yelp "location" parameter to find the results, but I wanted to try using a separate site and call for kicks, so I pulled longitude and latitude from a different API.

The project structure is a basic example of how I'm used to setting up my boilerplate, including linting and git hooks. I've also included redux-actions, since I'm a fan of Flux Standard Actions, but rarely if ever find a need for the full React-Redux implementation.

There's some unit tests in here for some of the service components, so you can run Jest and get some valid results.

## Usage

```cmd
yarn start
```

```cmd
yarn test
```
