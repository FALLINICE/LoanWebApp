"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "./utils/userContext";

export default function Home() {
  const { user } = useUser();
  console.log("User: ", user);

  // Check if the user is authenticated based on the presence of email and password
  const isAuthenticated = user.name && user.password;

  return (
    <>
      <Navbar />
      <header className="bg-blue-600 text-white p-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to Fintrust Partners</h1>
        <p className="mt-4 text-lg">
          Your trusted partner in achieving financial freedom.
        </p>
        <div>
          {isAuthenticated ? (
            <p className="mt-4">Hello, {user.name || "User"}!</p>
          ) : (
            <></>
          )}
          <Button className="mt-6 text-white bg-blue-700 hover:bg-blue-800 py-2 px-6 rounded transition duration-300">
            {/* Conditionally render the link based on authentication */}
            {isAuthenticated ? (
              <Link href="/LoanApplication">Apply For Loan</Link>
            ) : (
              <Link href="/auth/sign-in/user">Login to Apply</Link>
            )}
          </Button>
        </div>
      </header>

      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <div className="relative w-full h-64">
              <Image
                src="/images/image1.png"
                alt="Low Rates"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="text-xl font-semibold">Low Interest Rates</h3>
            <p className="mt-2">
              We offer competitive interest rates that help you save money over time.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="relative w-full h-64">
              <Image
                src="/images/image2.jpeg"
                alt="Flexible Terms"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="text-xl font-semibold">Flexible Terms</h3>
            <p className="mt-2">
              Our loan terms are customizable to fit your unique financial situation.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="relative w-full h-64">
              <Image
                src="/images/image3.jpeg"
                alt="Quick Approvals"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="text-xl font-semibold">Quick Approvals</h3>
            <p className="mt-2">
              Get your loan approved in no time with our fast and efficient process.
            </p>
          </div>
        </div>
      </section>

      <section className="p-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded shadow">
            <p className="italic">
              "Thanks to Fintrust Partners, I was able to buy my first home!"
            </p>
            <h4 className="font-bold mt-2">- Sarah J.</h4>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow">
            <p className="italic">
              "The loan process was so simple and fast. Highly recommend!"
            </p>
            <h4 className="font-bold mt-2">- Michael T.</h4>
          </div>
        </div>
      </section>

      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <form className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            required
            InputLabelProps={{
              style: { color: "blue" }, // Change the color of the label
            }}
            InputProps={{
              style: { borderColor: "blue" }, // Change the border color
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            className="mb-4"
            required
            InputLabelProps={{
              style: { color: "blue" },
            }}
            InputProps={{
              style: { borderColor: "blue" },
            }}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            className="mb-4"
            required
            InputLabelProps={{
              style: { color: "blue" },
            }}
            InputProps={{
              style: { borderColor: "blue" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full bg-blue-700 hover:bg-blue-800 transition duration-300"
          >
            Send Message
          </Button>
        </form>
      </section>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Fintrust Partners. All Rights Reserved.</p>
      </footer>
    </>
  );
}
