import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentUser } = await serverAuth(req, res);

    const { movieId } = req.query;

    if (!movieId) {
      throw new Error("Invalid movie ID");
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: String(movieId),
      },
    });

    if (!existingMovie) {
      throw new Error("Movie not found");
    }

    if (req.method === "POST") {
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || " ",
        },
        data: {
          favoriteIds: {
            push: String(movieId),
          },
        },
      });

      res.status(200).json(updatedUser);
    } else if (req.method === "DELETE") {
      const updatedFavoriteIds = without(
        currentUser.favoriteIds,
        String(movieId)
      );

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      res.status(200).json(updatedUser);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
