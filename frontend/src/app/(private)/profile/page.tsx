"use client";

import { DragEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/zustand/auth";
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { getSupabaseInstanseClient } from "@/supabase/getSupabaseInstanseClient";
import { createUUID } from "@/lib/utils";
import Show from "@/lib/show";

export default function Profile() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const supabase = getSupabaseInstanseClient();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const fetchAvatar = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(`public/76ab1d26-8e12-47e0-a853-fe66e67f3fee.png`);

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    }
  };

  fetchAvatar();

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageSrc = e.target?.result;
        setImageUrl(imageSrc as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    setShowLoading(true);
    const uuid = createUUID();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuid}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`public/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error(error);
      setShowLoading(false);
      return;
    }

    setShowLoading(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;

    if (files === null || files.length === 0) return;

    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageSrc = e.target?.result;
        setImageUrl(imageSrc as string);
      };
      reader.readAsDataURL(file);

      uploadImage(file);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-black">
        <div className="container text-white py-4 flex flex-col gap-4">
          <h1 className="text-5xl">
            Bem vindo{" "}
            <strong className="capitalize">
              {user.user_metadata.full_name}
            </strong>
          </h1>

          <p>
            ultimo acesso em: {new Date(user.last_sign_in_at!).toLocaleString()}
          </p>
        </div>
      </div>

      {/** basic data section */}
      <div className="container flex gap-4">
        <div className="w-3/12 py-4 flex justify-center items-center">
          <label
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
          >
            <figure className="relative flex justify-center group">
              <Image
                src={
                  (imageUrl as string) ||
                  "https://i.pinimg.com/564x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg"
                }
                alt="profile picture"
                className="rounded-full shadow-md h-52 w-52 object-cover group-hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                height={208}
                width={208}
                onDrag={(event) => console.log(event)}
              />

              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block cursor-pointer">
                <ImagePlus className="h-6 w-6 text-white" />
              </span>

              <Show when={showLoading}>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Loader2 className="h-12 w-12 text-white animate-spin" />
                </span>
              </Show>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e)}
              />
            </figure>
          </label>
        </div>

        <div className="w-9/12 py-4">
          <h2 className="text-2xl mb-3 font-semibold">Dados básicos</h2>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="full_name">Nome completo</Label>
              <Input
                type="text"
                id="full_name"
                defaultValue={user.user_metadata.full_name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                type="text"
                id="username"
                defaultValue={user.user_metadata.username}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" defaultValue={user.email} />
            </div>

            <Button className="w-fit ml-auto">Salvar</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
