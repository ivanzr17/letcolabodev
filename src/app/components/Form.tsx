"use client";

import React, { useState } from "react";

import {
  TextArea,
  TextField,
  Theme,
  RadioGroup,
  Button,
} from "@radix-ui/themes";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "@/app/components/ImageUpload";
import savePost from "../actions/postActions";
import redirectTo from "../actions/redirectTo";
import { Post } from "@/models/Post";

const Form = ({ orgId, postDoc }: { orgId: string, postDoc?: Post }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePost = async (data: FormData) => {
    if (postDoc) {
      data.set("id", postDoc._id);
    }
    setIsLoading(true);
    data.append("orgId", orgId);
    try {
      const postDoc = await savePost(data);
      redirectTo(`/posts/${orgId}`);
    } catch (error) {
      console.error("Error saving post", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Theme>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          handleSavePost(formData);
        }}
        className="container mt-6 flex flex-col gap-4"
      >
        <div className="mb-1">
          <h3 className="font-medium mb-1">Título del proyecto</h3>
          <TextField.Root placeholder="Nombre del proyecto" name="title" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className=" gap-4 mb-1">
            <h3 className="font-medium">Nivel</h3>
            <RadioGroup.Root name="level">
              <RadioGroup.Item value="Básico">Básico</RadioGroup.Item>
              <RadioGroup.Item value="Intermedio">Intermedio</RadioGroup.Item>
              <RadioGroup.Item value="Avanzado">Avanzado</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div className=" gap-4 mb-1">
            <h3 className="font-medium">Tipo de proyecto</h3>
            <RadioGroup.Root name="project">
              <RadioGroup.Item value="Frontend">Frontend</RadioGroup.Item>
              <RadioGroup.Item value="Backend">Backend</RadioGroup.Item>
              <RadioGroup.Item value="FullStack">FullStack</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
        </div>
        <div className="mb-1">
          <h3 className="font-medium mb-1">Stack</h3>
          <TextField.Root
            placeholder="React, MongoDB, NodeJS, NextJS, Astro, ..."
            name="stack"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div id="icono">
            <h3 className="font-medium mb-1">Icono de la publicación</h3>
            <ImageUpload name="icon" icon={faUser} />
          </div>
          <div id="contacto">
            <h3 className="font-medium mb-1">Contacto</h3>
            <div className="flex gap-2">
              <div>
                <ImageUpload name="contact.photo" icon={faUser} />
              </div>
              <div className="grow">
                <TextField.Root placeholder="Nombre" name="contact.name" />
                <TextField.Root
                  placeholder="Mail"
                  name="contact.mail"
                  type="email"
                />
                <TextField.Root
                  placeholder="Linkedin"
                  name="contact.linkedin"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-1">
          <h3 className="font-medium mb-1">Descripción</h3>
          <TextArea
            placeholder="Descripción del proyecto"
            resize={"vertical"}
            name="description"
          />
        </div>
        <div className="flex justify-center text-center">
          <Button type="submit" size={"3"} disabled={isLoading}>
            <span className="px-8">
              {isLoading ? "Guardando..." : "Guardar"}
            </span>
          </Button>
        </div>
      </form>
    </Theme>
  );
};

export default Form;
