'use client';
import { useState } from "react";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { useFormik } from "formik";
import moment from "moment";
import DragAndDropImage from "./components/dragAndDrop";
import { toast } from "react-toastify";
import { PostData } from "./components/postData";
import { UploadImageToCloudinary } from "./components/uploadImageToCloudinary";
import validationSchemaNewActivitie from "./components/validationSchema";

interface FormValues {
  name: string;
  description: string;
  image: File | null;
  date: string;
  time: string;
  place: string;
}

export default function CreateActivityForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      description: "",
      image: null,
      date: "",
      time: "",
      place: "",
    },
    validationSchema: validationSchemaNewActivitie,
    onSubmit: async (values, { resetForm }) => {;

      const latitude = "latitud"
      const longitude = "longitud"
    
      let imageUrl = '';
      if (values.image) {
        imageUrl = await UploadImageToCloudinary(values.image);
        if (!imageUrl) {
          toast.error("No se pudo subir la imagen. Verifica e intenta nuevamente.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
      }
    
      const activityData = {
        ...values,
        creatorId:"9af12024-662e-41d6-8a91-78cc4d64c1df",
        image: imageUrl,
        latitude,
        longitude,
      };
      const isSuccess = await PostData(activityData);
      if (isSuccess) {
  
        resetForm();
        setImagePreview(null);
      }
    },
  });

  return (
    <div className="bg-[url('/assets/textura-fondo.avif')] min-h-screen flex items-center justify-center bg-customPalette-white">
      <div className="w-full max-w-4xl p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-gray">
        <h1 className="text-center text-3xl font-bold mb-6 text-customPalette-blue">
          Crear Nueva Actividad
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <form onSubmit={formik.handleSubmit} className="flex-1 space-y-4">
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Nombre de la Actividad
              </label>
              <input
                onBlur={formik.handleBlur}
                type="text"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
                className="mt-1 block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
           <div className="text-customPalette-red h-0.5">
            {formik.touched.name && formik.errors.name && (
                <>{formik.errors.name}</>
            )}
            </div>
            </div>

            <div className="relative">
              <label
                htmlFor="description"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Descripción
              </label>
              <textarea
                onBlur={formik.handleBlur}
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                required
                rows={3}
                className="mt-1 block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark"
              />
             <div className="text-customPalette-red h-0.5">
            {formik.touched.description && formik.errors.description && (
                <>{formik.errors.description}</>
            )}
            </div>
            
            </div>

            <div className="relative">
              <label
                htmlFor="image"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Imagen de la Actividad
              </label>
              <DragAndDropImage
                onImageUpload={(file) => {
                  formik.setFieldValue("image", file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setImagePreview(reader.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setImagePreview(null);
                  }
                }}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="date"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Fecha de la Actividad
              </label>
              <input
                onBlur={formik.handleBlur}
                type="date"
                id="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                required
                className="mt-1 block w-full p-2 pl-10 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark text-sm"
              />
            <div className="text-customPalette-red h-0.5">
                {formik.touched.date && formik.errors.date && (
                <>{formik.errors.date}</>
              )}
            </div>
            </div>

            <div className="relative">
              <label
                htmlFor="time"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Hora de la Actividad
              </label>
              <input
                onBlur={formik.handleBlur}
                type="time"
                id="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                required
                className="mt-1 block w-full p-2 pl-10 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark text-sm"
              />
              <div className="text-customPalette-red h-0.5">
                {formik.touched.time && formik.errors.time && (
                <>{formik.errors.time}</>
                )}
            </div>
            </div>

            <div className="relative">
              <label
                htmlFor="place"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
              >
                Lugar de la Actividad
              </label>
              <span className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                 <MapPinIcon className="w-5 h-5 text-customPalette-graydark" />
               </span>
              <input
                onBlur={formik.handleBlur}
                type="text"
                id="place"
                value={formik.values.place}
                onChange={formik.handleChange}
                required
                className="mt-1 block w-full p-2 pl-10 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark text-sm"
                placeholder="Ingrese la ubicación"
              />
                <div className="text-customPalette-red h-0.5">
                {formik.touched.place && formik.errors.place && (
                <>{formik.errors.place}</>
                )}
                </div>
            </div>

            <div className="flex justify-center gap-6 mt-6">
              <button
                type="reset"
                onClick={() => {
                  formik.resetForm();
                  setImagePreview(null);
                }}
                className="w-1/3 py-2 bg-customPalette-blue text-customPalette-white rounded-md hover:bg-customPalette-bluedark focus:outline-none"
              >
                Crear Actividad
              </button>
            </div>
          </form>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-customPalette-blue">
              Vista Previa
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-customPalette-bluedark mb-2">
                  {formik.values.name || "Nombre de la Actividad"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formik.values.description || "Descripción de la actividad"}
                </p>
                <div className="flex items-center text-gray-500 mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>
                    {formik.values.date
                      ? moment(formik.values.date, "YYYY-MM-DD").format("DD/MM/YYYY")
                      : "Fecha"}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{formik.values.time || "Hora"}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>{formik.values.place || "Lugar"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
