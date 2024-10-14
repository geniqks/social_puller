import { BrightDataController } from "@api/controllers/brightdata/brightdata.controller";
import { InstagramController } from "@api/controllers/instagram/instagram.controller";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { IocContainer } from "src/containers/inversify.container";
import { IInstagramPosts } from "src/interfaces/instagram.interface";

type BridghtDataQueryType = FastifyRequest<{
  Querystring: {
    urls: string;
  };
}>;

/**
 * Because of the twitter API price, we will use it only to post on the bot account.
 */
export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const brightDataController = IocContainer.container.get(BrightDataController);
  const instagramController = IocContainer.container.get(InstagramController);

  const querySchema = {
    schema: {
      querystring: {
        $ref: "brightDataUrlsQuerySchema#",
      },
    },
  };

  // #region BrightData
  fastify.get(
    "/comments",
    querySchema,
    async (request: BridghtDataQueryType, reply: FastifyReply) => {
      const { urls } = request.query;
      if (!urls) {
        reply.status(400).send({ message: "urls are required" });
        return;
      }

      const urlsArray = urls.split(",");

      try {
        const response = await brightDataController.getInstagramComments(
          urlsArray
        );
        reply.send(response);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  fastify.post(
    "/comments/webhook",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { body } = request;
      console.log(body);
      reply.send({ message: "ok" });
    }
  );

  fastify.get(
    "/posts",
    querySchema,
    async (request: BridghtDataQueryType, reply: FastifyReply) => {
      const { urls } = request.query;
      const urlsArray = urls.split(",");

      try {
        const response = await brightDataController.getInstagramPosts(
          urlsArray
        );
        reply.send(response);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  // [
  //   {
  //     input: {
  //       url: "https://www.instagram.com/p/C-iYTcaujC3/",
  //     },
  //     url: "https://www.instagram.com/p/C-iYTcaujC3/",
  //     user_posted: "xsqueezie",
  //     description: "ça vit ça vit ☀️",
  //     num_comments: 1793,
  //     date_posted: "2024-08-11T16:58:27.000Z",
  //     likes: 797966,
  //     photos: [
  //       "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455138890_337607262762118_7132338696721624764_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=bwi4-co-RjEQ7kNvgGknidW&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCfr5z2X8PJ9EP3aq3BXA0kStT-OmfCB7xMDdnRQR56Gw&oe=671367E1&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454997187_435853212747242_1943527513301227366_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Kxs-bootxzoQ7kNvgFamTik&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCICqf-LRSSX0KaLD2M-I4WUhRnGs3eUSq4crwT1fBpcw&oe=67137661&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454959301_868171741898576_18347636943873517_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=884WKLVbMUcQ7kNvgG9D8OU&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYD44Vxj2AbycGR2EfRAhUa07r_KdO6DzdENM9J1KN3nEg&oe=67135786&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454642887_1708906069858562_395245279423695019_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Mw5TRc9-r5AQ7kNvgFdSYki&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCcRbHjwpL2a-cMW7p3nSAY9gkzPXoOgs4dFfI1xHwD8w&oe=67135A5D&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/455036632_1007394890871636_4678418547420469869_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=0s_-G2d2l2wQ7kNvgFIZjk1&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCVSD-ppKChfLROSBHcF0kx6vs0rfEF1vxqNQccuP1ycg&oe=671361A7&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454929522_1594634638076487_3741525732673925901_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=103&_nc_ohc=db7bRLyowfcQ7kNvgG6Ydk0&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYAx0jWQg3mP3i3DIeKHVOoxGaBxSYg-6lkng_HKPrAxiw&oe=67137D10&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455036642_1549408202665370_8201545311221453205_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=xsN0nXUFG9gQ7kNvgG0xW27&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYA3B6QcRpyBhzKEX-KZaUqkvA-UKRhzRhmknuo64PZ2qA&oe=671367A6&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454963929_503245162298394_2612592740548078407_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=egKj7Key-bQQ7kNvgGsEHq6&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCReFokzI2pGrHA92RaFv-FlYrWVcbMEIxgUKQKoVtLKg&oe=671369B6&_nc_sid=4f4799",
  //       "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454795768_487133460596286_8465006073066169383_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=r8d9dqPXtzwQ7kNvgE-s3d4&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYBrjcs40Xw-AzBkGc4NtXjPk4QJGseHXXSMXK-wwudjnA&oe=671382B8&_nc_sid=4f4799",
  //     ],
  //     videos: [
  //       "https://instagram.fbcn7-2.fna.fbcdn.net/o1/v/t16/f2/m69/AQOZsSQITPJFLbgErKtc1YGvKc2ns8elP2xVyiSaAUVNxh-w89NfQ8aKkf8AEvBqhGXD8XFP8eZ1Wx57nWr1ULYi.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2Fyb3VzZWxfaXRlbS5jMi4xMDgwLmJhc2VsaW5lIn0&_nc_cat=111&vs=890251979633560_1816581146&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR0VvSkFkYmduVjU3RmNJQUhvX1NHWHg4Nnc1YnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dPanNIaHZKaVY2Y1NGTUVBUHlsY1p0aTFVNE5ia1lMQUFBRhUCAsgBACgAGAAbABUAACaQjseI9%2FGDQBUCKAJDMywXQB12yLQ5WBAYFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHXuBwA%3D&_nc_rid=e0bce938cf&ccb=9-4&oh=00_AYDIzqMOBwO87IwktQI2UD6cdUchJqAmDCwWtf-NidEwEQ&oe=670F8124&_nc_sid=4f4799",
  //     ],
  //     latest_comments: [
  //       {
  //         comments: "vеrу goоd",
  //         user_commenting: "ptimothyu221337k9_dbm",
  //         likes: 0,
  //       },
  //       {
  //         user_commenting: "victor_foret_",
  //         likes: 0,
  //       },
  //       {
  //         comments: "Oчeнь крутo!",
  //         user_commenting: "ystephaniea350102e5_iub",
  //         likes: 0,
  //       },
  //       {
  //         comments:
  //           "Et ça a voulu se mêler à la politique en disant à des gens qui pour une grosse partie galèrent à finir le mois, pour qui voter 😂",
  //         user_commenting: "mmath_iass",
  //         likes: 0,
  //       },
  //       {
  //         comments: "Очень крyтo!",
  //         user_commenting: "dsarab718429u5_trl",
  //         likes: 0,
  //       },
  //       {
  //         comments: "Magnific",
  //         user_commenting: "nicolasdupontdeligonnes",
  //         likes: 0,
  //       },
  //     ],
  //     post_id: "3432412755309244599",
  //     display_url: "https://www.instagram.com/p/C-iYTcaujC3/media/?size=l",
  //     shortcode: "C-iYTcaujC3",
  //     content_type: "Carousel",
  //     pk: "3432412755309244599",
  //     content_id: "C-iYTcaujC3",
  //     coauthor_producers: [],
  //     tagged_users: [
  //       {
  //         full_name: "Gentle Mates",
  //         id: "58803613190",
  //         is_verified: true,
  //         profile_pic_url:
  //           "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.2885-19/438175627_2613079568869875_8854329945985530158_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=103&_nc_ohc=VmeW2RhX7a4Q7kNvgHQyrQM&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCJN1MchnsTgKqjw7lBpgwwYQ3LqnFUs4cqScAVvnMV6A&oe=6713782A&_nc_sid=4f4799",
  //         username: "gentlemates",
  //       },
  //     ],
  //     followers: 8852447,
  //     posts_count: 697,
  //     profile_image_link:
  //       "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.2885-19/316982929_3289707791357455_3812409995407102088_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=38VJj8eLfTgQ7kNvgHcf1M7&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYB4BwVWi5sifpNZRBhVMHNCrYI2pgdlnt9CoP84Q8RvWg&oe=6713897A&_nc_sid=4f4799",
  //     is_verified: true,
  //     is_paid_partnership: false,
  //     partnership_details: {
  //       profile_id: null,
  //       username: null,
  //       profile_url: null,
  //     },
  //     user_posted_id: "299323636",
  //     post_content: [
  //       {
  //         index: 0,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455138890_337607262762118_7132338696721624764_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=bwi4-co-RjEQ7kNvgGknidW&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCfr5z2X8PJ9EP3aq3BXA0kStT-OmfCB7xMDdnRQR56Gw&oe=671367E1&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 1,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454997187_435853212747242_1943527513301227366_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Kxs-bootxzoQ7kNvgFamTik&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCICqf-LRSSX0KaLD2M-I4WUhRnGs3eUSq4crwT1fBpcw&oe=67137661&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 2,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454959301_868171741898576_18347636943873517_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=884WKLVbMUcQ7kNvgG9D8OU&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYD44Vxj2AbycGR2EfRAhUa07r_KdO6DzdENM9J1KN3nEg&oe=67135786&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 3,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454642887_1708906069858562_395245279423695019_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Mw5TRc9-r5AQ7kNvgFdSYki&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCcRbHjwpL2a-cMW7p3nSAY9gkzPXoOgs4dFfI1xHwD8w&oe=67135A5D&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 4,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/455036632_1007394890871636_4678418547420469869_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=0s_-G2d2l2wQ7kNvgFIZjk1&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCVSD-ppKChfLROSBHcF0kx6vs0rfEF1vxqNQccuP1ycg&oe=671361A7&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 5,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454929522_1594634638076487_3741525732673925901_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=103&_nc_ohc=db7bRLyowfcQ7kNvgG6Ydk0&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYAx0jWQg3mP3i3DIeKHVOoxGaBxSYg-6lkng_HKPrAxiw&oe=67137D10&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 6,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455036642_1549408202665370_8201545311221453205_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=xsN0nXUFG9gQ7kNvgG0xW27&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYA3B6QcRpyBhzKEX-KZaUqkvA-UKRhzRhmknuo64PZ2qA&oe=671367A6&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 7,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454963929_503245162298394_2612592740548078407_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=egKj7Key-bQQ7kNvgGsEHq6&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCReFokzI2pGrHA92RaFv-FlYrWVcbMEIxgUKQKoVtLKg&oe=671369B6&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 8,
  //         type: "Video",
  //         url: "https://instagram.fbcn7-2.fna.fbcdn.net/o1/v/t16/f2/m69/AQOZsSQITPJFLbgErKtc1YGvKc2ns8elP2xVyiSaAUVNxh-w89NfQ8aKkf8AEvBqhGXD8XFP8eZ1Wx57nWr1ULYi.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2Fyb3VzZWxfaXRlbS5jMi4xMDgwLmJhc2VsaW5lIn0&_nc_cat=111&vs=890251979633560_1816581146&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR0VvSkFkYmduVjU3RmNJQUhvX1NHWHg4Nnc1YnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dPanNIaHZKaVY2Y1NGTUVBUHlsY1p0aTFVNE5ia1lMQUFBRhUCAsgBACgAGAAbABUAACaQjseI9%2FGDQBUCKAJDMywXQB12yLQ5WBAYFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHXuBwA%3D&_nc_rid=e0bce938cf&ccb=9-4&oh=00_AYDIzqMOBwO87IwktQI2UD6cdUchJqAmDCwWtf-NidEwEQ&oe=670F8124&_nc_sid=4f4799",
  //       },
  //       {
  //         index: 9,
  //         type: "Photo",
  //         url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454795768_487133460596286_8465006073066169383_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=r8d9dqPXtzwQ7kNvgE-s3d4&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYBrjcs40Xw-AzBkGc4NtXjPk4QJGseHXXSMXK-wwudjnA&oe=671382B8&_nc_sid=4f4799",
  //       },
  //     ],
  //     audio: {
  //       audio_asset_id: null,
  //       original_audio_title: null,
  //       ig_artist_username: null,
  //       ig_artist_id: null,
  //     },
  //     profile_url: "https://www.instagram.com/xsqueezie",
  //     timestamp: "2024-10-14T22:39:28.272Z",
  //   },
  // ];
  fastify.post(
    "/posts/webhook",
    async (
      request: FastifyRequest<{ Body: IInstagramPosts[] }>,
      reply: FastifyReply
    ) => {
      // TODO: si une url contient un warning il faut retirer l'url de la dernière ressource en ready
      const { body } = request;
      await instagramController.registerPosts(body);
      reply.send({ message: "ok" });
    }
  );

  fastify.get(
    "/profiles",
    querySchema,
    async (request: BridghtDataQueryType, reply: FastifyReply) => {
      const { urls } = request.query;
      const urlsArray = urls.split(",");

      try {
        const response = await brightDataController.getInstagramProfile(
          urlsArray
        );
        reply.send(response);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  fastify.post(
    "/profiles/webhook",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { body } = request;
      console.log(body);
      reply.send({ message: "ok" });
    }
  );

  fastify.get(
    "/reels",
    querySchema,
    async (request: BridghtDataQueryType, reply: FastifyReply) => {
      const { urls } = request.query;
      const urlsArray = urls.split(",");

      try {
        const response = await brightDataController.getInstagramReels(
          urlsArray
        );
        reply.send(response);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  fastify.post(
    "/reels/webhook",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { body } = request;
      console.log(body);
      reply.send({ message: "ok" });
    }
  );
  // #endregion
}
