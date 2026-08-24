```jsx
import { useEffect, useState } from "react";
import "./App.css";

// ==========================================
// DEPLOYED BACKEND URL
// ==========================================
const API_URL =
  "https://ticket-booking-system-backend-i5s9.onrender.com";

function App() {
  // ==========================================
  // MOVIES & SHOWS
  // ==========================================
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  // ==========================================
  // BOOKING
  // ==========================================
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  const [bookingMessage, setBookingMessage] = useState("");

  // ==========================================
  // LOADING
  // ==========================================
  const [loading, setLoading] = useState(true);

  // ==========================================
  // AUTHENTICATION
  // ==========================================
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [authMessage, setAuthMessage] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ==========================================
  // MY BOOKINGS
  // ==========================================
  const [myBookings, setMyBookings] = useState([]);
  const [showMyBookings, setShowMyBookings] = useState(false);

  // ==========================================
  // LOAD SAVED USER
  // ==========================================
  useEffect(() => {
    const savedUser = localStorage.getItem("ticketBookingUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("ticketBookingUser");
      }
    }
  }, []);

  // ==========================================
  // FETCH MOVIES & SHOWS
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
  // REGISTER
  // ==========================================
  const handleRegister = async (e) => {
    e.preventDefault();

    setAuthMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerForm),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        setAuthMessage(
          data.error || "Registration failed."
        );
        return;
      }

      setAuthMessage(
        "Registration successful! You can now login."
      );

      setRegisterForm({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        setShowRegister(false);
        setShowLogin(true);
        setAuthMessage("");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);

      setAuthMessage(
        "Unable to connect to the server."
      );
    }
  };

  // ==========================================
  // LOGIN
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();

    setAuthMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginForm),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        setAuthMessage(
          data.error || "Invalid email or password."
        );
        return;
      }

      setUser(data.user);

      localStorage.setItem(
        "ticketBookingUser",
        JSON.stringify(data.user)
      );

      setLoginForm({
        email: "",
        password: "",
      });

      setShowLogin(false);
      setAuthMessage("");
    } catch (error) {
      console.error("Login error:", error);

      setAuthMessage(
        "Unable to connect to the server."
      );
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = () => {
    localStorage.removeItem("ticketBookingUser");

    setUser(null);
    setMyBookings([]);
    setShowMyBookings(false);

    setBookingMessage("");
  };

  // ==========================================
  // LOAD BOOKED SEATS
  // ==========================================
  const loadBookedSeats = async (showId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/bookings/show/${showId}`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setBookedSeats(
          data.map((item) => Number(item.seats))
        );
      } else {
        setBookedSeats([]);
      }
    } catch (error) {
      console.error(
        "Error loading booked seats:",
        error
      );

      setBookedSeats([]);
    }
  };

  // ==========================================
  // BOOK NOW
  // ==========================================
  const handleBookNow = async (movie) => {
    const movieShow = shows.find(
      (show) =>
        Number(show.movie_id) ===
        Number(movie.movie_id)
    );

    setSelectedMovie(movie);
    setSelectedShow(movieShow || null);
    setSelectedSeat(null);
    setBookingMessage("");

    if (movieShow) {
      await loadBookedSeats(movieShow.show_id);
    }
  };

  // ==========================================
  // CONFIRM BOOKING
  // ==========================================
  const handleBooking = async () => {
    if (!user) {
      setBookingMessage(
        "Please login before booking a ticket."
      );

      setShowLogin(true);
      return;
    }

    if (!selectedSeat) {
      setBookingMessage(
        "Please select a seat first."
      );
      return;
    }

    if (!selectedShow) {
      setBookingMessage(
        "No show is available for this movie."
      );
      return;
    }

    if (
      bookedSeats.includes(Number(selectedSeat))
    ) {
      setBookingMessage(
        "This seat is already booked."
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
            user_id:
              user["user id"] ||
              user.user_id ||
              user.id,

            show_id: selectedShow.show_id,

            seats: selectedSeat,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        setBookingMessage(
          data.error ||
            "Booking failed. Please try again."
        );
        return;
      }

      setBookingMessage(
        `🎉 Booking successful! Your Booking ID is ${data.booking.booking_id}`
      );

      await loadBookedSeats(
        selectedShow.show_id
      );

      setSelectedSeat(null);
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      setBookingMessage(
        "Unable to connect to the server. Please try again."
      );
    }
  };

  // ==========================================
  // GET MY BOOKINGS
  // ==========================================
  const loadMyBookings = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const userId =
      user["user id"] ||
      user.user_id ||
      user.id;

    try {
      const response = await fetch(
        `${API_URL}/api/bookings/user/${userId}`
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        console.error(data.error);
        return;
      }

      setMyBookings(data);
      setShowMyBookings(true);

      setTimeout(() => {
        document
          .getElementById("my-bookings")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    } catch (error) {
      console.error(
        "Error loading bookings:",
        error
      );
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>🎬 Loading movies...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app">

      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav className="navbar">

        <div className="logo">
          🎬 Ticket Booking
        </div>

        <div className="nav-links">

          <span
            onClick={() =>
              document
                .getElementById("movies")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Home
          </span>

          <span
            onClick={() =>
              document
                .getElementById("movies")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Movies
          </span>

          <span onClick={loadMyBookings}>
            My Bookings
          </span>

          {user ? (
            <>
              <span className="user-name">
                👤 {user.name}
              </span>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="login-button"
                onClick={() => {
                  setShowLogin(true);
                  setAuthMessage("");
                }}
              >
                Login
              </button>

              <button
                className="register-button"
                onClick={() => {
                  setShowRegister(true);
                  setAuthMessage("");
                }}
              >
                Register
              </button>
            </>
          )}

        </div>
      </nav>


      {/* =====================================
          HERO
      ====================================== */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small-title">
            WELCOME TO TICKET BOOKING
          </p>

          <h1>
            Book Your Movie
            <br />
            <span>Tickets Easily</span>
          </h1>

          <p>
            Choose your favourite movie, select
            your seat, and confirm your booking
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
            Explore Movies
          </button>

        </div>

        <div className="hero-icon">
          🎬
        </div>

      </section>


      {/* =====================================
          MOVIES
      ====================================== */}

      <main
        className="container"
        id="movies"
      >

        <div className="section-heading">

          <p>NOW SHOWING</p>

          <h2>
            Choose Your Movie
          </h2>

        </div>


        {movies.length === 0 ? (

          <div className="empty-message">

            <h3>
              No movies available
            </h3>

            <p>
              Please add a movie to the database.
            </p>

          </div>

        ) : (

          <div className="movie-grid">

            {movies.map((movie) => {

              const movieShow =
                shows.find(
                  (show) =>
                    Number(show.movie_id) ===
                    Number(movie.movie_id)
                );

              return (

                <div
                  className="movie-card"
                  key={movie.movie_id}
                >

                  <div className="movie-poster">
                    🎬
                  </div>

                  <div className="movie-info">

                    <span className="movie-badge">
                      NOW SHOWING
                    </span>

                    <h3>
                      {movie.title}
                    </h3>

                    <p className="duration">
                      ⏱ {movie.duration}
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
                      Book Now →
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}


        {/* =====================================
            BOOKING SECTION
        ====================================== */}

        {selectedMovie && (

          <section className="booking-section">

            <div className="booking-header">

              <p>
                BOOK YOUR TICKET
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


            {/* SEATS */}

            <div className="seat-container">

              <h3>
                Select Your Seat
              </h3>

              <div className="screen">
                SCREEN
              </div>

              <div className="seat-grid">

                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                  (seat) => {

                    const isBooked =
                      bookedSeats.includes(seat);

                    const isSelected =
                      selectedSeat === seat;

                    return (

                      <button
                        key={seat}
                        disabled={isBooked}
                        className={
                          isBooked
                            ? "seat booked"
                            : isSelected
                            ? "seat selected"
                            : "seat"
                        }
                        onClick={() => {

                          if (!isBooked) {

                            setSelectedSeat(
                              seat
                            );

                            setBookingMessage("");

                          }

                        }}
                      >
                        {seat}
                      </button>

                    );

                  }
                )}

              </div>


              <div className="seat-legend">

                <span>
                  <span className="legend-box available"></span>
                  Available
                </span>

                <span>
                  <span className="legend-box selected-box"></span>
                  Selected
                </span>

                <span>
                  <span className="legend-box booked-box"></span>
                  Booked
                </span>

              </div>


              {selectedSeat && (

                <p className="selected-seat">
                  Selected Seat:
                  <strong>
                    {" "}
                    {selectedSeat}
                  </strong>
                </p>

              )}

            </div>


            {/* CONFIRM BOOKING */}

            <button
              className="confirm-button"
              onClick={handleBooking}
            >
              Confirm Booking 🎟️
            </button>


            {/* MESSAGE */}

            {bookingMessage && (

              <div className="booking-message">
                {bookingMessage}
              </div>

            )}


            {/* CLOSE */}

            <button
              className="close-button"
              onClick={() => {

                setSelectedMovie(null);
                setSelectedShow(null);
                setSelectedSeat(null);
                setBookedSeats([]);
                setBookingMessage("");

              }}
            >
              Close
            </button>

          </section>

        )}


        {/* =====================================
            MY BOOKINGS
        ====================================== */}

        {showMyBookings && (

          <section
            className="my-bookings-section"
            id="my-bookings"
          >

            <div className="section-heading">

              <p>
                YOUR BOOKINGS
              </p>

              <h2>
                My Bookings
              </h2>

            </div>


            {myBookings.length === 0 ? (

              <div className="empty-message">

                <h3>
                  No bookings yet 🎟️
                </h3>

                <p>
                  Book your favourite movie
                  to see it here.
                </p>

              </div>

            ) : (

              <div className="booking-list">

                {myBookings.map(
                  (booking) => (

                    <div
                      className="booking-card"
                      key={booking.booking_id}
                    >

                      <div className="booking-card-icon">
                        🎬
                      </div>

                      <div>

                        <h3>
                          {booking.title}
                        </h3>

                        <p>
                          🎟️ Booking ID:
                          {" "}
                          {booking.booking_id}
                        </p>

                        <p>
                          💺 Seat:
                          {" "}
                          {booking.seats}
                        </p>

                        <p>
                          📅 Show Date:
                          {" "}
                          {booking.show_date}
                        </p>

                        <p>
                          🕐 Show Time:
                          {" "}
                          {booking.show_time}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </section>

        )}

      </main>


      {/* =====================================
          LOGIN MODAL
      ====================================== */}

      {showLogin && (

        <div className="modal-overlay">

          <div className="auth-modal">

            <button
              className="modal-close"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ×
            </button>

            <h2>
              🔐 Login
            </h2>

            <p>
              Login to book your tickets
            </p>

            <form onSubmit={handleLogin}>

              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    email: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    password: e.target.value,
                  })
                }
                required
              />

              <button
                type="submit"
                className="auth-button"
              >
                Login
              </button>

            </form>

            {authMessage && (

              <p className="auth-message">
                {authMessage}
              </p>

            )}

            <p className="switch-auth">

              Don't have an account?

              <button
                onClick={() => {

                  setShowLogin(false);
                  setShowRegister(true);
                  setAuthMessage("");

                }}
              >
                Register
              </button>

            </p>

          </div>

        </div>

      )}


      {/* =====================================
          REGISTER MODAL
      ====================================== */}

      {showRegister && (

        <div className="modal-overlay">

          <div className="auth-modal">

            <button
              className="modal-close"
              onClick={() =>
                setShowRegister(false)
              }
            >
              ×
            </button>

            <h2>
              📝 Create Account
            </h2>

            <p>
              Create your ticket booking account
            </p>

            <form onSubmit={handleRegister}>

              <input
                type="text"
                placeholder="Full Name"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    email: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    password: e.target.value,
                  })
                }
                required
              />

              <button
                type="submit"
                className="auth-button"
              >
                Create Account
              </button>

            </form>

            {authMessage && (

              <p className="auth-message">
                {authMessage}
              </p>

            )}

            <p className="switch-auth">

              Already have an account?

              <button
                onClick={() => {

                  setShowRegister(false);
                  setShowLogin(true);
                  setAuthMessage("");

                }}
              >
                Login
              </button>

            </p>

          </div>

        </div>

      )}


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="footer">

        <p>
          © 2026 Ticket Booking System
        </p>

        <p>
          Built with React, Node.js,
          Express & PostgreSQL
        </p>

      </footer>

    </div>
  );
}

export default App;
```
