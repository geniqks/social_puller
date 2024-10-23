import { InstagramController } from "@api/controllers/instagram/instagram.controller";
import { IocContainer } from "@containers/inversify.container";
import { IInstagramPosts } from "@interfaces/instagram.interface";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

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
        const response = await instagramController.getInstagramComments(
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

      const response = await instagramController.getInstagramPosts(urlsArray);
      reply.send(response);
    }
  );

  const test = [
    {
      input: {
        url: "https://www.instagram.com/p/C-iYTcaujC3/",
      },
      url: "https://www.instagram.com/p/C-iYTcaujC3/",
      user_posted: "xsqueezie",
      description: "ça vit ça vit ☀️",
      num_comments: 1793,
      date_posted: "2024-08-11T16:58:27.000Z",
      likes: 797966,
      photos: [
        "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455138890_337607262762118_7132338696721624764_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=bwi4-co-RjEQ7kNvgGknidW&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCfr5z2X8PJ9EP3aq3BXA0kStT-OmfCB7xMDdnRQR56Gw&oe=671367E1&_nc_sid=4f4799",
        "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454997187_435853212747242_1943527513301227366_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Kxs-bootxzoQ7kNvgFamTik&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCICqf-LRSSX0KaLD2M-I4WUhRnGs3eUSq4crwT1fBpcw&oe=67137661&_nc_sid=4f4799",
        "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454959301_868171741898576_18347636943873517_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=884WKLVbMUcQ7kNvgG9D8OU&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYD44Vxj2AbycGR2EfRAhUa07r_KdO6DzdENM9J1KN3nEg&oe=67135786&_nc_sid=4f4799",
        "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454642887_1708906069858562_395245279423695019_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Mw5TRc9-r5AQ7kNvgFdSYki&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCcRbHjwpL2a-cMW7p3nSAY9gkzPXoOgs4dFfI1xHwD8w&oe=67135A5D&_nc_sid=4f4799",
        "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/455036632_1007394890871636_4678418547420469869_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=0s_-G2d2l2wQ7kNvgFIZjk1&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCVSD-ppKChfLROSBHcF0kx6vs0rfEF1vxqNQccuP1ycg&oe=671361A7&_nc_sid=4f4799",
        "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454929522_1594634638076487_3741525732673925901_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=103&_nc_ohc=db7bRLyowfcQ7kNvgG6Ydk0&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYAx0jWQg3mP3i3DIeKHVOoxGaBxSYg-6lkng_HKPrAxiw&oe=67137D10&_nc_sid=4f4799",
        "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455036642_1549408202665370_8201545311221453205_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=xsN0nXUFG9gQ7kNvgG0xW27&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYA3B6QcRpyBhzKEX-KZaUqkvA-UKRhzRhmknuo64PZ2qA&oe=671367A6&_nc_sid=4f4799",
        "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454963929_503245162298394_2612592740548078407_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=egKj7Key-bQQ7kNvgGsEHq6&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCReFokzI2pGrHA92RaFv-FlYrWVcbMEIxgUKQKoVtLKg&oe=671369B6&_nc_sid=4f4799",
        "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454795768_487133460596286_8465006073066169383_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=r8d9dqPXtzwQ7kNvgE-s3d4&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYBrjcs40Xw-AzBkGc4NtXjPk4QJGseHXXSMXK-wwudjnA&oe=671382B8&_nc_sid=4f4799",
      ],
      videos: [
        "https://instagram.fbcn7-2.fna.fbcdn.net/o1/v/t16/f2/m69/AQOZsSQITPJFLbgErKtc1YGvKc2ns8elP2xVyiSaAUVNxh-w89NfQ8aKkf8AEvBqhGXD8XFP8eZ1Wx57nWr1ULYi.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2Fyb3VzZWxfaXRlbS5jMi4xMDgwLmJhc2VsaW5lIn0&_nc_cat=111&vs=890251979633560_1816581146&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR0VvSkFkYmduVjU3RmNJQUhvX1NHWHg4Nnc1YnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dPanNIaHZKaVY2Y1NGTUVBUHlsY1p0aTFVNE5ia1lMQUFBRhUCAsgBACgAGAAbABUAACaQjseI9%2FGDQBUCKAJDMywXQB12yLQ5WBAYFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHXuBwA%3D&_nc_rid=e0bce938cf&ccb=9-4&oh=00_AYDIzqMOBwO87IwktQI2UD6cdUchJqAmDCwWtf-NidEwEQ&oe=670F8124&_nc_sid=4f4799",
      ],
      latest_comments: [
        {
          comments: "vеrу goоd",
          user_commenting: "ptimothyu221337k9_dbm",
          likes: 0,
        },
        {
          user_commenting: "victor_foret_",
          likes: 0,
        },
        {
          comments: "Oчeнь крутo!",
          user_commenting: "ystephaniea350102e5_iub",
          likes: 0,
        },
        {
          comments:
            "Et ça a voulu se mêler à la politique en disant à des gens qui pour une grosse partie galèrent à finir le mois, pour qui voter 😂",
          user_commenting: "mmath_iass",
          likes: 0,
        },
        {
          comments: "Очень крyтo!",
          user_commenting: "dsarab718429u5_trl",
          likes: 0,
        },
        {
          comments: "Magnific",
          user_commenting: "nicolasdupontdeligonnes",
          likes: 0,
        },
      ],
      post_id: "3432412755309244599",
      display_url: "https://www.instagram.com/p/C-iYTcaujC3/media/?size=l",
      shortcode: "C-iYTcaujC3",
      content_type: "Carousel",
      pk: "3432412755309244599",
      content_id: "C-iYTcaujC3",
      coauthor_producers: [],
      tagged_users: [
        {
          full_name: "Gentle Mates",
          id: "58803613190",
          is_verified: true,
          profile_pic_url:
            "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.2885-19/438175627_2613079568869875_8854329945985530158_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=103&_nc_ohc=VmeW2RhX7a4Q7kNvgHQyrQM&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCJN1MchnsTgKqjw7lBpgwwYQ3LqnFUs4cqScAVvnMV6A&oe=6713782A&_nc_sid=4f4799",
          username: "gentlemates",
        },
      ],
      followers: 8852447,
      posts_count: 697,
      profile_image_link:
        "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.2885-19/316982929_3289707791357455_3812409995407102088_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=1&_nc_ohc=38VJj8eLfTgQ7kNvgHcf1M7&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYB4BwVWi5sifpNZRBhVMHNCrYI2pgdlnt9CoP84Q8RvWg&oe=6713897A&_nc_sid=4f4799",
      is_verified: true,
      is_paid_partnership: false,
      partnership_details: {
        profile_id: null,
        username: null,
        profile_url: null,
      },
      user_posted_id: "299323636",
      post_content: [
        {
          index: 0,
          type: "Photo",
          url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455138890_337607262762118_7132338696721624764_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=bwi4-co-RjEQ7kNvgGknidW&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCfr5z2X8PJ9EP3aq3BXA0kStT-OmfCB7xMDdnRQR56Gw&oe=671367E1&_nc_sid=4f4799",
        },
        {
          index: 1,
          type: "Photo",
          url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454997187_435853212747242_1943527513301227366_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Kxs-bootxzoQ7kNvgFamTik&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCICqf-LRSSX0KaLD2M-I4WUhRnGs3eUSq4crwT1fBpcw&oe=67137661&_nc_sid=4f4799",
        },
        {
          index: 2,
          type: "Photo",
          url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454959301_868171741898576_18347636943873517_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=884WKLVbMUcQ7kNvgG9D8OU&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYD44Vxj2AbycGR2EfRAhUa07r_KdO6DzdENM9J1KN3nEg&oe=67135786&_nc_sid=4f4799",
        },
        {
          index: 3,
          type: "Photo",
          url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454642887_1708906069858562_395245279423695019_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Mw5TRc9-r5AQ7kNvgFdSYki&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCcRbHjwpL2a-cMW7p3nSAY9gkzPXoOgs4dFfI1xHwD8w&oe=67135A5D&_nc_sid=4f4799",
        },
        {
          index: 4,
          type: "Photo",
          url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/455036632_1007394890871636_4678418547420469869_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=0s_-G2d2l2wQ7kNvgFIZjk1&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCVSD-ppKChfLROSBHcF0kx6vs0rfEF1vxqNQccuP1ycg&oe=671361A7&_nc_sid=4f4799",
        },
        {
          index: 5,
          type: "Photo",
          url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/454929522_1594634638076487_3741525732673925901_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=103&_nc_ohc=db7bRLyowfcQ7kNvgG6Ydk0&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYAx0jWQg3mP3i3DIeKHVOoxGaBxSYg-6lkng_HKPrAxiw&oe=67137D10&_nc_sid=4f4799",
        },
        {
          index: 6,
          type: "Photo",
          url: "https://instagram.fbcn7-3.fna.fbcdn.net/v/t51.29350-15/455036642_1549408202665370_8201545311221453205_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=xsN0nXUFG9gQ7kNvgG0xW27&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYA3B6QcRpyBhzKEX-KZaUqkvA-UKRhzRhmknuo64PZ2qA&oe=671367A6&_nc_sid=4f4799",
        },
        {
          index: 7,
          type: "Photo",
          url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454963929_503245162298394_2612592740548078407_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=egKj7Key-bQQ7kNvgGsEHq6&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYCReFokzI2pGrHA92RaFv-FlYrWVcbMEIxgUKQKoVtLKg&oe=671369B6&_nc_sid=4f4799",
        },
        {
          index: 8,
          type: "Video",
          url: "https://instagram.fbcn7-2.fna.fbcdn.net/o1/v/t16/f2/m69/AQOZsSQITPJFLbgErKtc1YGvKc2ns8elP2xVyiSaAUVNxh-w89NfQ8aKkf8AEvBqhGXD8XFP8eZ1Wx57nWr1ULYi.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2Fyb3VzZWxfaXRlbS5jMi4xMDgwLmJhc2VsaW5lIn0&_nc_cat=111&vs=890251979633560_1816581146&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR0VvSkFkYmduVjU3RmNJQUhvX1NHWHg4Nnc1YnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dPanNIaHZKaVY2Y1NGTUVBUHlsY1p0aTFVNE5ia1lMQUFBRhUCAsgBACgAGAAbABUAACaQjseI9%2FGDQBUCKAJDMywXQB12yLQ5WBAYFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHXuBwA%3D&_nc_rid=e0bce938cf&ccb=9-4&oh=00_AYDIzqMOBwO87IwktQI2UD6cdUchJqAmDCwWtf-NidEwEQ&oe=670F8124&_nc_sid=4f4799",
        },
        {
          index: 9,
          type: "Photo",
          url: "https://instagram.fbcn7-2.fna.fbcdn.net/v/t51.29350-15/454795768_487133460596286_8465006073066169383_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbcn7-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=r8d9dqPXtzwQ7kNvgE-s3d4&_nc_gid=e0bcecd82b1c456f90f8b57d02b1e3f5&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AYBrjcs40Xw-AzBkGc4NtXjPk4QJGseHXXSMXK-wwudjnA&oe=671382B8&_nc_sid=4f4799",
        },
      ],
      audio: {
        audio_asset_id: null,
        original_audio_title: null,
        ig_artist_username: null,
        ig_artist_id: null,
      },
      profile_url: "https://www.instagram.com/xsqueezie",
      timestamp: "2024-10-14T22:39:28.272Z",
    },
  ];
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
    "/profile",
    querySchema,
    async (request: BridghtDataQueryType, reply: FastifyReply) => {
      const { urls } = request.query;
      const urlsArray = urls.split(",");

      const response = await instagramController.getInstagramProfile(urlsArray);
      reply.send(response);
    }
  );

  const testProfile = [
    {
      input: {
        url: "https://www.instagram.com/xsqueezie/",
      },
      account: "xsqueezie",
      fbid: "17841401789084676",
      id: "299323636",
      followers: 8847065,
      posts_count: 698,
      is_business_account: true,
      is_professional_account: true,
      is_verified: true,
      avg_engagement: 0.0975,
      external_url: ["http://www.gentlemates.com/"],
      biography:
        "« Merci Internet » disponible sur Prime Video 🫶🏻\n@unfoldprod & @gentlemates",
      business_category_name: "None",
      category_name: "Artist",
      following: 311,
      posts: [
        {
          caption:
            "Ça fait 10 ans que mon meilleur pote @theodorebonnet réalise mes vidéos YouTube et me filme en off. Il a décidé de vous raconter tout ce que j’ai vécu dans une série documentaire, « Merci Internet », le 19 Janvier sur Prime Video.",
          comments: 6766,
          datetime: "2023-12-17T11:56:34.000Z",
          id: "3259763595150919455",
          image_url:
            "https://instagram.fdmm2-2.fna.fbcdn.net/v/t51.29350-15/411871663_1991853037865014_5006443956134564223_n.jpg?stp=dst-jpg_e15_fr_p1080x1080&_nc_ht=instagram.fdmm2-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=-whi8CdLXTIQ7kNvgHCFcEw&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCDxP1Vsgc16dH8XRN-5PtjyY-wOHF9KaPWQ5Tb4LGjxQ&oe=671D400A&_nc_sid=8b3546",
          likes: 898082,
          content_type: "GraphVideo",
          url: "https://www.instagram.com/p/C09AbgEuIcf",
          video_url:
            "https://instagram.fdmm2-3.fna.fbcdn.net/o1/v/t16/f1/m82/724A95440EEA24551AE504227FDF5CBC_video_dashinit.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuMTA4MC5iYXNlbGluZSJ9&_nc_cat=101&vs=2549908268545761_572869525&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC83MjRBOTU0NDBFRUEyNDU1MUFFNTA0MjI3RkRGNUNCQ192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dIMTVpQmdscThyMW9Cb0RBSVgwZUVxcFpTZFhicV9FQUFBRhUCAsgBACgAGAAbABUAACawxKeT45bGQBUCKAJDMywXQFzj1wo9cKQYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%3D%3D&ccb=9-4&oh=00_AYBJcHSOqMekrrcpDT764X3gPV05UwjzONdjdBlzgaVxBQ&oe=67195A7D&_nc_sid=8b3546",
        },
        {
          caption: "one more dump",
          comments: 457,
          datetime: "2024-10-21T17:13:36.000Z",
          id: "3483879453425698410",
          image_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.29350-15/464167645_1072032977709406_5384126897381152997_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=4ZwuontaWcUQ7kNvgHZ6O4f&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCOIlXWTGpCc8Hx1upFFCKUKhN3Eu3sWU84vbE-01V91g&oe=671D4F93&_nc_sid=8b3546",
          likes: 481449,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/DBZOeeNuIZq",
          video_url: null,
        },
        {
          caption:
            "📸 by @josephmolines / face & body prep by @theordinary (collaboration commerciale)",
          comments: 1390,
          datetime: "2024-09-11T18:21:44.000Z",
          id: "3454922719458038443",
          image_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.29350-15/459302906_503734782295564_7311630508667875345_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=7ZXw4vErQvsQ7kNvgFqJzz1&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCHTmWvg6iaNlM8WXGTsAEBzCLbMnWImYjGxkniQbTP8g&oe=671D47D5&_nc_sid=8b3546",
          likes: 593283,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C_yWeiLuRKr",
          video_url: null,
        },
        {
          caption: "ça vit ça vit ☀️",
          comments: 1802,
          datetime: "2024-08-11T16:58:27.000Z",
          id: "3432412755309244599",
          image_url:
            "https://instagram.fdmm2-2.fna.fbcdn.net/v/t51.29350-15/455138890_337607262762118_7132338696721624764_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=CSMwkibjsQIQ7kNvgGf4jaM&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYDdSmI4qae8gfewlXIcotRRJg1BDtUY-dB6-pkGcbeX9Q&oe=671D4B21&_nc_sid=8b3546",
          likes: 798479,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C-iYTcaujC3",
          video_url: null,
        },
        {
          caption: "vraiment 🤌🏻☀️",
          comments: 2165,
          datetime: "2024-07-21T19:05:54.000Z",
          id: "3417256611456508769",
          image_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.29350-15/452105419_3599281493717303_4608795286959995319_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=c5uaLPUDha0Q7kNvgE7goPh&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYA0Art0_XA6VHFNjHI_MxNlcSQByHDcs3h7YrxcYQ5WNw&oe=671D55F4&_nc_sid=8b3546",
          likes: 789391,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C9siMhgOGNh",
          video_url: null,
        },
        {
          caption: "☀️ dump",
          comments: 3417,
          datetime: "2024-06-28T18:53:06.000Z",
          id: "3400580324587709518",
          image_url:
            "https://instagram.fdmm2-2.fna.fbcdn.net/v/t51.29350-15/449420802_1550578462193470_1988928582284394507_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=k8jhMDLb2xAQ7kNvgGp6lhk&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCN6T7HcZz6oFcoiepulRkDxqvO7m9Hh4NsziZBXTukOg&oe=671D5255&_nc_sid=8b3546",
          likes: 685062,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C8xScnFO6RO",
          video_url: null,
        },
        {
          caption: "Lettre ouverte à tous les jeunes qui me suivent 🇫🇷",
          comments: 155506,
          datetime: "2024-06-14T13:12:21.000Z",
          id: "3390261963487576248",
          image_url:
            "https://instagram.fdmm2-2.fna.fbcdn.net/v/t51.29350-15/448261435_863642788921202_2137628923142153020_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-2.fna.fbcdn.net&_nc_cat=102&_nc_ohc=59eSQWb5-8cQ7kNvgEIAX3s&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYDo0Umyp-fPVlj4WcdpmcTsszqXG8bph7HxI0M-uozkiA&oe=671D37C5&_nc_sid=8b3546",
          likes: 1972421,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C8MoUsdMgC4",
          video_url: null,
        },
        {
          caption:
            "📸 @pierreangecarlotti / grooming by @theordinary (collaboration commerciale)",
          comments: 3734,
          datetime: "2024-06-01T17:09:06.000Z",
          id: "3380959039759948570",
          image_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.29350-15/447216874_391352510579673_4995591227902777036_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=jBX2fywDNUcQ7kNvgEoBuYQ&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYB2S4ACGU8UUXR9ByZ3uP6hVAJ1kDnBC_EX1w0cxfHGow&oe=671D64DC&_nc_sid=8b3546",
          likes: 744624,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C7rlFVlCZsa",
          video_url: null,
        },
        {
          caption: "back on youtube 🫶🏻",
          comments: 1718,
          datetime: "2024-05-22T18:24:28.000Z",
          id: "3373749210040506107",
          image_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.29350-15/445607434_693165382899076_6364063968198562894_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=__BX5hN5TBwQ7kNvgFbVPeH&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCXNIcCrKzHEloVUcPlYx5BkAECy4lUO1tniHynlseQMQ&oe=671D6AA4&_nc_sid=8b3546",
          likes: 950471,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C7R9wgZuBb7",
          video_url: null,
        },
        {
          caption: "De retour sur youtube Samedi 18 Mai 🫶🏻",
          comments: 5100,
          datetime: "2024-05-11T17:10:12.000Z",
          id: "3365738146409496936",
          image_url:
            "https://instagram.fdmm2-3.fna.fbcdn.net/v/t51.29350-15/436380193_463257052897743_3632775992333215463_n.jpg?stp=dst-jpg_e15_fr_p1080x1080&_nc_ht=instagram.fdmm2-3.fna.fbcdn.net&_nc_cat=103&_nc_ohc=kU48hi7bEHAQ7kNvgEzXB41&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYC5R8ymrdydYv3inBUnKxTnZ_7aj-cF8cOGng_FM6ZbDQ&oe=671D388D&_nc_sid=8b3546",
          likes: 484702,
          content_type: "GraphVideo",
          url: "https://www.instagram.com/p/C61gQL_uEFo",
          video_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/o1/v/t16/f1/m82/B0404D936E617D296260CC3128994C91_video_dashinit.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuNzIwLmJhc2VsaW5lIn0&_nc_cat=111&vs=1145405593251148_3847992370&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9CMDQwNEQ5MzZFNjE3RDI5NjI2MENDMzEyODk5NEM5MV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dLTXpFeHFxaWZuam9uZ0JBS3ZacHQ2dmVyUlVicV9FQUFBRhUCAsgBACgAGAAbABUAACbQqqrPsenWPxUCKAJDMywXQEDmZmZmZmYYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%3D%3D&ccb=9-4&oh=00_AYAElM8c4wGtRdw1ld5rb5KjN3zbw-CcU-F805ywou1SrQ&oe=671965F7&_nc_sid=8b3546",
        },
        {
          caption: "update ⏳",
          comments: 1107,
          datetime: "2024-03-26T19:26:14.000Z",
          id: "3332468087800803422",
          image_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.29350-15/434585092_449996487465700_7217878318177160070_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=yjYpZuvHe38Q7kNvgGyW2eE&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYB0GDuaMQt3osStXqqp3u5jn-IBjH5TQBjvLm4VJMGOdQ&oe=671D53D9&_nc_sid=8b3546",
          likes: 765027,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C4_ThHWsTBe",
          video_url: null,
        },
        {
          caption: "another dump",
          comments: 2015,
          datetime: "2024-02-11T20:43:48.000Z",
          id: "3300616989549020819",
          image_url:
            "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.29350-15/426230284_1576799399775917_5163044279464006136_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=W2bh4rTr_vMQ7kNvgF_M4xE&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYDCYm_fL3RBwVVnC9zvJBFd53RVFpIaN_pclbqV1I6MyQ&oe=671D63C8&_nc_sid=8b3546",
          likes: 1011025,
          content_type: "GraphSidecar",
          url: "https://www.instagram.com/p/C3OJaohsEaT",
          video_url: null,
        },
      ],
      profile_image_link:
        "https://instagram.fdmm2-1.fna.fbcdn.net/v/t51.2885-19/316982929_3289707791357455_3812409995407102088_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fdmm2-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=w7pWBNxiNPAQ7kNvgF9g8cf&_nc_gid=5b8636bf2c9a4c18a639e09fa49ed6c4&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYDYD3dlQ-XTMKnej5s0BqXHHJUX8R3tjqUi3HgxnQoShA&oe=671D347A&_nc_sid=8b3546",
      profile_url: "https://instagram.com/xsqueezie",
      profile_name: null,
      highlights_count: 1,
      full_name: null,
      is_private: false,
      url: "https://www.instagram.com/xsqueezie/",
      is_joined_recently: false,
      has_channel: false,
      partner_id: "299323636",
      timestamp: "2024-10-22T10:24:14.473Z",
    },
  ];
  fastify.post(
    "/profile/webhook",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { body } = request;
      await instagramController.registerProfile(testProfile as any);
      reply.send({ message: "ok" });
    }
  );

  fastify.get(
    "/reels",
    querySchema,
    async (request: BridghtDataQueryType, reply: FastifyReply) => {
      const { urls } = request.query;
      const urlsArray = urls.split(",");

      const response = await instagramController.getInstagramReels(urlsArray);
      reply.send(response);
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
