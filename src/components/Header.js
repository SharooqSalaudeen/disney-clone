import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const setUser = useCallback(
    (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userName, history, setUser]);

  return (
    <Nav>
      <Logo src="/images/logo.svg" alt="Disney Clone" />
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="Home" />
              <span>Home</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" alt="Search" />
              <span>Search</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="Watchlist" />
              <span>Watchlist</span>
            </a>
            <a href="/originals">
              <img src="/images/original-icon.svg" alt="Originals" />
              <span>Originals</span>
            </a>
            <a href="/movies">
              <img src="/images/movie-icon.svg" alt="mMvies" />
              <span>Movies</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" alt="Series" />
              <span>Series</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImage src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
      {/* <Login onClick={handleAuth}>Login</Login> */}
    </Nav>
  );
}

export default Header;

const Nav = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #090b13;
  z-index: 3;
  align-items: center;
`;

const Logo = styled.img`
  /* margin-top: 5px; */
  display: block;
  max-height: 50px;
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  flex-flow: row nowrap;
  justify-content: flex-end;
  position: relative;
  margin: 0px;
  margin-right: auto;
  margin-left: 25px;
  padding: 0px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      padding: 2px 4px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  letter-spacing: 1.5px;
  width: 70px;
  padding: 6px 12px;
  text-align: center;
  justify-content: center;
  /* display: flex; */
  /* flex-direction: column; */
  cursor: pointer;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImage = styled.img`
  height: 100%;
  border-radius: 50%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  font-size: 14px;
  width: 100px;
  padding: 10px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
