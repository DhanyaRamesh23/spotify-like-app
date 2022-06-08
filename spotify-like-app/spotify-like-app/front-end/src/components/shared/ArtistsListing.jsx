import Rating from "./Rating";

export default function ArtistsListing({ artists }) {
  return (
    <div className="artists-listing">
      {artists && artists.length > 0 ? (
        artists.map((artist, id) => {
          return <ArtistItem key={id} artist={artist} />;
        })
      ) : (
        <>No artists available</>
      )}
    </div>
  );
}

function ArtistItem({ artist }) {
  return (
    <div className="artist-item card">
      <div className="artists-text">
        <h3 className="artist-name">{artist.name}</h3>
        <div className="artist-dob">
          Date of birth: {FormatDate(artist.dob)}
        </div>
        <div className="artist-bio faded"> {artist.bio}</div>
        <div className="artist-songs">
          <br />
          Songs <br /> <span className="faded">{artist.songs || "NaN"}</span>
          <br />
        </div>
      </div>

      <div className="artist-average-rating">
        Average rating : <Rating rating={artist.avg_rating || 0} />
      </div>
    </div>
  );
}

const FormatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
