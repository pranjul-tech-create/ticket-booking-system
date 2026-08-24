import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://ticket-booking-system-backend-i5s9.onrender.com";

function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [bookingMessage, setBookingMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH MOVIES AND SHOWS
  // ==========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await fetch(
          `${API_URL}/api/movies`
        );

        const showsResponse = await fetch(
          `${API_URL}/api/shows`
        );

        if (!moviesResponse.ok || !showsResponse.ok) {
          throw new Error("Failed to fetch movies or shows");
        }

        const moviesData = await moviesResponse.json();
        const showsData = await showsResponse.json();

        setMovies(moviesData);
        setShows(showsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================================
  // BOOK NOW
  // ==========================================

  const handleBookNow = (movie) => {
    const movieShow = shows.find(
      (show) =>
        Number(show.movie_id) === Number(movie.movie_id)
    );

    setSelectedMovie(movie);
    setSelectedShow(movieShow || null);
    setSelectedSeat(null);
    setBookingMessage("");

    setTimeout(() => {
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ==========================================
  // CONFIRM BOOKING
  // ==========================================

  const handleBooking = async () => {
    if (!selectedSeat) {
      setBookingMessage("Please select a seat first.");
      return;
    }

    if (!selectedShow) {
      setBookingMessage(
        "No show is available for this movie."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Test user
            user_id: 3,
            show_id: selectedShow.show_id,
            seats: selectedSeat,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        setBookingMessage(
          data.error || "Booking failed. Please try again."
        );
        return;
      }

      setBookingMessage(
        `🎉 Booking successful! Your Booking ID is ${data.booking.booking_id}`
      );
    } catch (error) {
      console.error("Booking error:", error);

      setBookingMessage(
        "Unable to connect to the server. Please try again."
      );
    }
  };

  // ==========================================
  // CLOSE BOOKING
  // ==========================================

  const closeBooking = () => {
    setSelectedMovie(null);
    setSelectedShow(null);
    setSelectedSeat(null);
    setBookingMessage("");
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-icon">🎬</div>
          <h2>Loading movies...</h2>
          <p>Please wait while we load the latest shows.</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="app">

      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="navbar">

        <div className="logo">
          <span className="logo-icon">🎬</span>
          <span>Ticket Booking</span>
        </div>

        <div className="nav-links">

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Home
          </button>

          <button
            onClick={() =>
              document
                .getElementById("movies")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Movies
          </button>

          <button
            onClick={() =>
              document
                .getElementById("booking")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Book Ticket
          </button>

        </div>

      </nav>

      {/* ======================================
          HERO SECTION
      ====================================== */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small-title">
            🎟️ WELCOME TO TICKET BOOKING
          </p>

          <h1>
            Your Movie.
            <br />
            <span>Your Seat.</span>
            <br />
            Your Experience.
          </h1>

          <p className="hero-description">
            Discover movies, choose your favourite show,
            select your perfect seat and book your tickets
            in just a few clicks.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("movies")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Movies →
          </button>

        </div>

        <div className="hero-visual">

          <div className="ticket-card">

            <div className="ticket-top">
              <span>🎬</span>
              <span>MOVIE TICKET</span>
            </div>

            <div className="ticket-main">
              <div className="big-ticket-icon">
                🎟️
              </div>

              <h3>
                BOOK
                <br />
                YOUR
                <br />
                SEAT
              </h3>
            </div>

            <div className="ticket-bottom">
              <span>★★★★</span>
              <span>2026</span>
            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          MOVIES
      ====================================== */}

      <main className="container" id="movies">

        <div className="section-heading">

          <p>NOW SHOWING</p>

          <h2>
            Choose Your Movie
          </h2>

          <span>
            Select a movie and reserve your seat today.
          </span>

        </div>

        {movies.length === 0 ? (

          <div className="empty-message">

            <div>🎬</div>

            <h3>No movies available</h3>

            <p>
              Please add a movie to the database.
            </p>

          </div>

        ) : (

          <div className="movie-grid">

            {movies.map((movie) => {

              const movieShow = shows.find(
                (show) =>
                  Number(show.movie_id) ===
                  Number(movie.movie_id)
              );

              return (

                <div
                  className="movie-card"
                  key={movie.movie_id}
                >

                  {/* Poster */}

                  <div className="movie-poster">

                    <div className="poster-overlay">

                      <span>
                        🎬
                      </span>

                      <small>
                        NOW SHOWING
                      </small>

                    </div>

                  </div>

                  {/* Movie Details */}

                  <div className="movie-info">

                    <span className="movie-badge">
                      NOW SHOWING
                    </span>

                    <h3>
                      {movie.title}
                    </h3>

                    {movie.genre && (
                      <p className="movie-genre">
                        🎭 {movie.genre}
                      </p>
                    )}

                    {movie.language && (
                      <p className="movie-language">
                        🌐 {movie.language}
                      </p>
                    )}

                    <p className="duration">
                      ⏱️ {movie.duration}
                    </p>

                    {movieShow && (

                      <div className="show-info">

                        <p>
                          📅 {movieShow.show_date}
                        </p>

                        <p>
                          🕐 {movieShow.show_time}
                        </p>

                      </div>

                    )}

                    <button
                      className="book-button"
                      onClick={() =>
                        handleBookNow(movie)
                      }
                    >
                      Book Now
                      <span>→</span>
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

        {/* ====================================
            BOOKING SECTION
        ==================================== */}

        {selectedMovie && (

          <section
            className="booking-section"
            id="booking"
          >

            <div className="booking-header">

              <p>
                🎟️ BOOK YOUR TICKET
              </p>

              <h2>
                {selectedMovie.title}
              </h2>

              {selectedShow && (

                <div className="selected-show">

                  <span>
                    📅 {selectedShow.show_date}
                  </span>

                  <span>
                    🕐 {selectedShow.show_time}
                  </span>

                </div>

              )}

            </div>

            {/* Seat Selection */}

            <div className="seat-container">

              <h3>
                Select Your Seat
              </h3>

              <p className="seat-instruction">
                Choose one available seat below.
              </p>

              <div className="screen">
                <span>
                  SCREEN
                </span>
              </div>

              <div className="seat-grid">

                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                  (seat) => (

                    <button
                      key={seat}
                      className={
                        selectedSeat === seat
                          ? "seat selected"
                          : "seat"
                      }
                      onClick={() =>
                        setSelectedSeat(seat)
                      }
                    >
                      {seat}
                    </button>

                  )
                )}

              </div>

              <div className="seat-legend">

                <span>
                  <i className="legend-available"></i>
                  Available
                </span>

                <span>
                  <i className="legend-selected"></i>
                  Selected
                </span>

              </div>

              {selectedSeat && (

                <p className="selected-seat">
                  Selected Seat:
                  <strong>
                    {selectedSeat}
                  </strong>
                </p>

              )}

            </div>

            {/* Confirm */}

            <button
              className="confirm-button"
              onClick={handleBooking}
            >
              Confirm Booking 🎟️
            </button>

            {/* Message */}

            {bookingMessage && (

              <div
                className={
                  bookingMessage.includes(
                    "successful"
                  )
                    ? "booking-message success"
                    : "booking-message"
                }
              >
                {bookingMessage}
              </div>

            )}

            {/* Close */}

            <button
              className="close-button"
              onClick={closeBooking}
            >
              ← Choose Another Movie
            </button>

          </section>

        )}

      </main>

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="footer">

        <div className="footer-logo">
          🎬 Ticket Booking
        </div>

        <p>
          © 2026 Ticket Booking System
        </p>

        <p>
          Built with React, Node.js, Express &
          PostgreSQL
        </p>

      </footer>

    </div>
  );
}

export default App;