# DOW-JONES Custom Slideshow


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Code Dependencies: 
  - Green Sock Animation Engine

## How to update
you'll find newData in the index.html 
updating that data object will update the ad for you

setting the DEBUT to true will display the console logs, setting it to false will hide it
```js
DEBUG: true
```
you can change the unit by changing the unit value: "apac", "latam", "uk", "us"
```js
 unit: "apac"
 ```
example data for each unit:
```js
 apac: {
        slides: [
            {
                header: "Through the Lens of the S&P China 500",
                subheader: "A more complete pixture of the Chinese economy.",
                image_desktop: "./assets/images/apac/apac-d-1.jpg",
                image_mobile: "./assets/images/apac/apac-m-1.jpg",
                cta: "Learn more 1"
            },
            {
                header: "Persistence of Australian Active Funds",
                subheader: "Do outperformers continue outperforming?",
                image_desktop: "./assets/images/apac/apac-d-2.jpg",
                image_mobile: "./assets/images/apac/apac-m-2.jpg",
                cta: "Learn more 2"
            },
            {
                header: "Understanding Commodities and the S&P GSCI",
                subheader: "What tools exist for accessing various facets of the commodities market?",
                image_desktop: "./assets/images/apac/apac-d-3.jpg",
                image_mobile: "./assets/images/apac/apac-m-3.jpg",
                cta: "Learn more 3"
            },
            {
                header: "S&P 500® ESG: Integrating Environmental, Social, and Governance",
                subheader: "How does it compare to the S&P 500?",
                image_desktop: "./assets/images/apac/apac-d-4.jpg",
                image_mobile: "./assets/images/apac/apac-m-4.jpg",
                cta: "Learn more 4"
            }
        ]
    },
```

##### developer: Tanvir Haider
