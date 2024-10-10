# Drivers
| Driver      | Documentation                                                                    |
|-------------|--------------------------------------------------------------------------------|
| Twitter     | https://developer.x.com/en                                                      |
| Instagram - BrightDataDriver   | https://docs.brightdata.com/scraping-automation/web-data-apis/web-scraper-api/overview            |
| Instagram | |
| Reddit      | https://www.reddit.com/dev/api/                                                 |

# Twitter
Twitter provides the capability to generate a bearer token directly from the developer portal, eliminating the need for a custom implementation for this driver.
After obtaining the bearer token, add it to your environment file under the **TWITTER_BEARER_TOKEN** variable.

# Instagram


# Instagram - BrightData
> ! Instagram doesn't allow us to access other profile public data we need to scrap them

BrightData provides the capability to generate a bearer token directly from the developer portal, eliminating the need for a custom implementation for this driver.
After obtaining the bearer token, add it to your environment file under the **BRIGHT_DATA_TOKEN** variable.

# Reddit
To set up OAuth2 and obtain the token for bot usage, you need to configure the following environment variables:
  | Variable |
  |----------|
  | REDDIT_CLIENT_ID |
  | REDDIT_CLIENT_SECRET |
  | REDDIT_PASSWORD |
  | REDDIT_REDIRECT_URI |
  | REDDIT_USERNAME |
  | REDDIT_USER_AGENT |

You can obtain **REDDIT_CLIENT_ID**, **REDDIT_CLIENT_SECRET**, and **REDDIT_REDIRECT_URI** by creating an application on the Reddit apps page: reddit.com/prefs/apps.

In the Reddit portal, you need to set **REDDIT_REDIRECT_URI** to http://yourdomain.com/reddit/auth/callback

**REDDIT_USERNAME** and **REDDIT_PASSWORD** correspond to your Reddit account credentials.

**REDDIT_USER_AGENT** can be customized as desired, e.g., "myApp:v0.0.1"

To acquire the token, you need to authorize your account to use your application by navigating to the following URL: http://yourdomain.com/reddit/auth

Upon accessing this URL, a file named **'reddit_token.txt'** will be generated. This file will contain the token value that should be assigned to the **REDDIT_USER_TOKEN** variable in your .env file. After setting the environment variable, it is recommended to delete the 'reddit_token.txt' file for security purposes.

Once these steps are completed, you will be able to utilize all Reddit-related routes on behalf of the authorized account.

Note: You can modify the application scope in the `authorize()` function within `reddit.driver.ts`. A comprehensive list of all available Reddit scopes can be found at: https://www.reddit.com/api/v1/scopes