import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import useMoviesList from "@/hooks/useMovieList";
import MovieList from "@/components/movielist";
import useFavorites from "@/hooks/usefavorites";
import InfoModal from "@/components/infomodal";
import useInfoModalStore from "@/hooks/useInfoModalStore";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMoviesList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
