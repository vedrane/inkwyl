import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        bio,
        passwordConfirmation
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, { expires: 365 });
          Router.push('/', undefined, { shallow: true });
        }
      });
  }
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <title>Inkwyl Sign-Up</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#aba48a" />

        <meta name="description" content="Inkwyl is a social media for writing and sharing stories." />

        <meta property="og:url" content="https://inkwyl.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Inkwyl" />
        <meta property="og:description" content="Inkwyl is a social media for writing and sharing stories." />
        <meta property="og:image" content="/social.png" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="inkwyl.vercel.app" />
        <meta property="twitter:url" content="https://inkwyl.vercel.app/" />
        <meta name="twitter:title" content="Inkwyl" />
        <meta name="twitter:description" content="Inkwyl is a social media for writing and sharing stories." />
        <meta name="twitter:image" content="/social.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>
    <div className="logoContainer">
        <Link href="/">
         <Image src="/logo.svg" layout="fill" objectPosition="top"
          className="logo" />
          </Link>
     </div>
           <div className="navbar">
        <Link href="/">
          Home&nbsp;&#32;
     </Link>
        <Link href="/editor">
          Editor&nbsp;&#32;
     </Link>
        <Link href="/about">
          About&nbsp;&#32;
     </Link>
        <Link href="/users">
          Users&nbsp;&#32;
     </Link>
        <Link href="/login">Login&nbsp;&#32;</Link>
        <Link href="/signup">Signup&#32;</Link>
              <Link href="/tos">TOS&#32;</Link>
      </div>
      <div class="mcontent">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label htmlFor="username">
            Username:&nbsp;&#32;
        <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
            />
          </label><br />
          <label htmlFor="email">
            Email:&nbsp;&#32;
        <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
            />
          </label>
          <br />

          <label htmlFor="password">
            Password:&nbsp;&#32;
        <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            /></label><br />
          <label for="confirm">
            Confirm Password:&nbsp;&#32;
        <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              name="confirm"
              type="password"
            />
          </label><br />
          <label htmlFor="bio">
            Bio (Tell us about yourself):&nbsp;&#32;<br />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              name="bio"
            />
          </label>
          <br />

          <input type="submit" value="Submit" />
          {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
        </form>
        <p>Please be aware you can only change these values by emailing <Link href="mailto:inkwyl@gmail.com">inkwyl@gmail.com</Link>, so please choose carefully. Your bio will read "No bio given" if no bio is specified.</p>
        <Link href="/tos">Please read the Terms of Service before signing up</Link>
      </div>
    </div>
  );
};

export default Signup;
