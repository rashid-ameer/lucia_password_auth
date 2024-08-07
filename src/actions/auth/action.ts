"use server";

import prisma from "@/lib/prisma";
import { loginFormSchema, signupFormSchema } from "@/lib/schemas";
import { generateIdFromEntropySize } from "lucia";
import { hash, verify } from "@node-rs/argon2";
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// create a user
export async function signup(data: unknown) {
  // validate login data
  const validationResult = signupFormSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid data format" };
  }

  const { username, password } = validationResult.data;
  // check if the user exist
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (existingUser) {
    return { error: "Username already exists" };
  }

  // create a userId
  const userId = generateIdFromEntropySize(10);
  // generate a password hash
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  await prisma.user.create({
    data: { id: userId, username, password_hash: passwordHash },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}

// login
export async function login(data: unknown) {
  const validationResult = loginFormSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid data format" };
  }

  const { username, password } = validationResult.data;

  // check if ther user exists
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // if no user
  if (!user) {
    return { error: "Incorrect username or password" };
  }

  // check the password
  const validPassword = await verify(user.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return { error: "Incorrect username or password" };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

// logout
export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    return { error: "Unauthorized" };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/login");
}
