import supabase, { supabaseUrl } from "./superbase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error("Login failed");
  }
  //   console.log("Login data = ", data);
  return { data };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error("Login error", { cause: userError });

  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Login error", { cause: error });
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  console.log("fileName = ", fileName);
  const { error: storageError } = await supabase.storage
    .from("avaters")
    .upload(fileName, avatar);

  console.log("storageError = ", storageError);

  if (storageError) throw new Error(storageError.message);
  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      //                      /storage/v1/object/public/avaters//000.png
      avatar: `${supabaseUrl}/storage/v1/object/public/avaters/${fileName}`,
    },
  });
  //
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
