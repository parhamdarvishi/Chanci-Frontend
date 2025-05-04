"use client";
import React, { useState } from "react";
import toastAlert from "@shared/helpers/toast";
import styles from "./AddNewEvent.module.scss";
import { postRequest } from "@/shared/api/chanci/baseUpload";
import cookie from "@/shared/helpers/cookie";

const AddNewEvent = () => {
  const [formData, setFormData] = useState({
    shortTitle: "",
    longTitle: "",
    hostedBy: "",
    supportedBy: "",
    description: "",
    address: "",
    content: "",
    lat: 0,
    lng: 0,
    hostDate: "",
    start: "",
    end: "",
    redirectUrl: "",
    bannerImagePath: "",
    cardImagePath: "",
    mobileImagePath: "",
    hostedByLogoPath: "",
    supportedByLogoPath: "",
    isShowable: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      debugger;
      const jsonData = JSON.stringify(formData);
      const response = await postRequest(
        "https://api10.ukngn.com/api/Event/Add",
        jsonData,
        true
      );

      if (response.status === 200) {
        toastAlert("Event added successfully!", "success");

        window.location.href = "/panel/events";
      } else {
        toastAlert("Failed to add event", "error");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toastAlert("An error occurred while adding the event", "error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Event</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="shortTitle">Short Title</label>
          <input
            type="text"
            id="shortTitle"
            name="shortTitle"
            value={formData.shortTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="longTitle">Long Title</label>
          <textarea
            id="longTitle"
            name="longTitle"
            value={formData.longTitle}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lat">Latitude</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lng">Longitude</label>
          <input
            type="number"
            id="lng"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="hostedBy">Hosted By</label>
          <input
            type="text"
            id="hostedBy"
            name="hostedBy"
            value={formData.hostedBy}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="supportedBy">Supported By</label>
          <input
            type="text"
            id="supportedBy"
            name="supportedBy"
            value={formData.supportedBy}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="hostDate">Host Date</label>
          <input
            type="date"
            id="hostDate"
            name="hostDate"
            value={formData.hostDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="start">Start Time</label>
          <input
            type="time"
            id="start"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="end">End Time</label>
          <input
            type="time"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="redirectUrl">Redirect URL</label>
          <input
            type="url"
            id="redirectUrl"
            name="redirectUrl"
            value={formData.redirectUrl}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bannerImagePath">Banner Image Path</label>
          <input
            type="url"
            id="bannerImagePath"
            name="bannerImagePath"
            value={formData.bannerImagePath}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cardImagePath">Card Image Path</label>
          <input
            type="url"
            id="cardImagePath"
            name="cardImagePath"
            value={formData.cardImagePath}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="mobileImagePath">Mobile Image Path</label>
          <input
            type="url"
            id="mobileImagePath"
            name="mobileImagePath"
            value={formData.mobileImagePath}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="hostedByLogoPath">Hosted By Logo</label>
          <input
            type="url"
            id="hostedByLogoPath"
            name="hostedByLogoPath"
            value={formData.hostedByLogoPath}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="supportedByLogoPath">Supported By Logo</label>
          <input
            type="url"
            id="supportedByLogoPath"
            name="supportedByLogoPath"
            value={formData.supportedByLogoPath}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="isShowable">Is Showable</label>
          <input
            type="checkbox"
            id="isShowable"
            name="isShowable"
            checked={formData.isShowable}
            onChange={(e) =>
              setFormData({ ...formData, isShowable: e.target.checked })
            }
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddNewEvent;
