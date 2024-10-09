import { ConfigService } from "@services/config.service";
import axios, { AxiosRequestConfig } from "axios";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import * as fs from "fs";
import { IocContainer } from "src/containers/inversify.container";
type CallbackQuery = FastifyRequest<{
  Querystring: {
    code: string;
  };
}>;

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  // TODO: toute la logique d'oauth il faudra la déplacer dans le RedditDriver
  const configService = IocContainer.container.get(ConfigService);
  const client_id = configService.get<string>("REDDIT_CLIENT_ID");
  const client_secret = configService.get<string>("REDDIT_CLIENT_SECRET");
  const redirect_uri = configService.get<string>("REDDIT_REDIRECT_URI");
  const user_agent = configService.get<string>("REDDIT_USER_AGENT");

  fastify.get("/community", async function (request, reply) {
    return "this is an example";
  });

  fastify.get(
    "/auth",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      // All scopes are available here
      // https://www.reddit.com/api/v1/scopes
      const scopes = [
        "identity",
        "edit",
        "flair",
        "history",
        "modconfig",
        "modflair",
        "modlog",
        "modposts",
        "modwiki",
        "mysubreddits",
        "privatemessages",
        "read",
        "report",
        "save",
        "submit",
        "subscribe",
        "vote",
        "wikiedit",
        "wikiread",
      ];

      const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=code&state=RANDOM&redirect_uri=${redirect_uri}&duration=permanent&scope=${scopes.join(
        " "
      )}`;

      console.log(authUrl); // TODO: remove this later

      reply.redirect(authUrl);
    }
  );

  fastify.get(
    "/auth/callback",
    async function (request: CallbackQuery, reply: FastifyReply) {
      request.log.info("Callback", request.query);
      const query = request.query;

      const axiosOptions: AxiosRequestConfig = {
        method: "POST",
        url: "https://www.reddit.com/api/v1/access_token",
        params: {
          grant_type: "authorization_code",
          code: query.code,
          redirect_uri: redirect_uri,
        },
        headers: {
          "User-Agent": user_agent,
        },
        auth: {
          username: client_id,
          password: client_secret,
        },
      };

      try {
        const response = await axios<{ access_token: string }>(axiosOptions);
        console.log(response.data); // TODO: remove this later
        fs.writeFile("reddit_token.txt", response.data.access_token, (err) => {
          if (err) {
            console.error("Couldn't save token");
          } else {
            console.log("token saved"); // TODO: remove this later
          }
        });
        reply.send("Logged in!");
      } catch (error) {
        console.error("Error", error);
      }
    }
  );
}
