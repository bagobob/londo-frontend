import Link from 'next/link'
import React, { useState } from 'react';
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    //   Form validation state
    const [errors, setErrors] = useState({});


    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const notify = () => {
        toast.success("Merci. Votre message a été envoyé", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    const notifyError = () => {
        toast.error("Oops. Un problème s'est produit, veuillez réessayer.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    // Validation check method
    const handleValidation = () => {
        let tempErrors = {};
        let isValid = true;

        if (firstName.length <= 0) {
            tempErrors["firstName"] = true;
            isValid = false;
        }
        if (email.length <= 0) {
            tempErrors["email"] = true;
            isValid = false;
        }
        if (lastName.length <= 0) {
            tempErrors["lastName"] = true;
            isValid = false;
        }
        if (phone.length <= 0) {
            tempErrors["phone"] = true;
            isValid = false;
        }
        if (subject.length <= 0) {
            tempErrors["subject"] = true;
            isValid = false;
        }
        if (message.length <= 0) {
            tempErrors["message"] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        console.log("errors", errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValidForm = handleValidation();
        if (isValidForm) {
            setButtonText("Sending");
            const res = await fetch("/api/sendgrid", {
                body: JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    subject: subject,
                    message: message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const { error } = await res.json();
            if (error) {
                console.log(error);
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setButtonText("Send");

                // Reset form fields
                setFirstName("");
                setLastName("");
                setPhone("");
                setEmail("");
                setMessage("");
                setSubject("");
                return;
            }
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setButtonText("Envoyez");
            // Reset form fields
            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
            setMessage("");
            setSubject("");
        }
        console.log(firstName, email, subject, message);
    };
    return (
        <>
            <Head>
                <title>Contact|Dare Enterprise</title>
                <meta
                    name="description"
                    content="Catalogue d'entreprise."
                />
            </Head>
            <ToastContainer />
            <div className="flex justify-center items-center w-screen bg-white">
                <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:container md:mx-auto md:my-4 md:px-4 md:lg:px-20">
                    <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <form onSubmit={handleSubmit}>
                            <div className="flex">
                                <h1 className="font-bold uppercase text-5xl">Envoyez nous un <br /> message</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">

                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Prénom*"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    required />
                                {errors?.firstName && (
                                    <p className="text-red-500">Le champ prénom ne peut pas être vide.</p>
                                )}
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Nom*"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    required />
                                {errors?.lastName && (
                                    <p className="text-red-500">Le champ nom ne peut pas être vide.</p>
                                )}
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="email" placeholder="Email*"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required />
                                {errors?.email && (
                                    <p className="text-red-500">Le champ email ne peut pas être vide.</p>
                                )}
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="number" placeholder="Téléphone*"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    required />
                                {errors?.phone && (
                                    <p className="text-red-500">Le champ téléphone ne peut pas être vide.</p>
                                )}
                            </div>
                            <div>
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Objet*"
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => {
                                        setSubject(e.target.value);
                                    }}
                                    required />
                                {errors?.objet && (
                                    <p className="text-red-500">Le champ Sujet ne peut pas être vide.</p>
                                )}
                            </div>
                            <div className="my-4">
                                <textarea required placeholder="Message*" className="w-full h-48 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    id="message"
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                ></textarea>
                                {errors?.message && (
                                    <p className="text-red-500">Le champ message ne peut pas être vide.</p>
                                )}
                            </div>
                            <div className="my-2 w-1/2 lg:w-1/4">
                                <button className="uppercase text-sm font-bold tracking-wide bg-black text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                                    Envoyez
                                </button>
                            </div>
                        </form>
                        <div>
                        {showSuccessMessage && (
                            notify()
                        )}
                        {showFailureMessage && (
                            notifyError()
                        )}
                    </div>
                    </div>

                    <div
                        className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 md:ml-auto bg-black/[0.8] rounded-2xl">
                        <div className="flex flex-col text-white">
                            <h1 className="font-bold uppercase text-4xl my-4">Qui sommes nous</h1>
                            <p className="text-white">Dare Entreprise est une filiale de Darecorp.</p>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Bureau principal</h2>
                                    <p className="text-white">Douala, Bonamoussadi.</p>
                                </div>
                            </div>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-phone-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Contactez Nous</h2>
                                    <p className="text-white">Tel: +237 6 56 28 88 38 </p>
                                    <p className="text-white">Tel: +237 6 78 80 10 70 </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact