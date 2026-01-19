"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { components } from "react-select";
import styled from "styled-components";
import { hover, Transition } from "../../styles/globalStyleVars";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      service: null,
      timeline: null,
      description: "",
    },
  });

  // Encode form data for Netlify submission
  const encode = (data) => {
    return Object.keys(data)
      .map((key) => {
        const value = data[key];
        // Handle react-select objects (service and timeline)
        if (value && typeof value === "object" && value.value) {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(value.label)
          );
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(value || "");
      })
      .join("&");
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...data,
        }),
      });

      // Netlify returns 200 for successful form submissions
      // Check for success based on status code
      if (response.ok) {
        setSubmitStatus("success");
        reset(); // Reset form after successful submission
      } else {
        console.error("Form submission failed with status:", response.status);
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "mobile-app-development", label: "Mobile App Development" },
    { value: "branding-identity", label: "Branding & Identity" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "ecommerce-solutions", label: "E-commerce Solutions" },
    {
      value: "custom-software-development",
      label: "Custom Software Development",
    },
    { value: "other", label: "Other" },
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP" },
    { value: "1-2-weeks", label: "1-2 weeks" },
    { value: "1-month", label: "1 month" },
    { value: "2-3-months", label: "2-3 months" },
    { value: "3-6-months", label: "3-6 months" },
    { value: "6-plus-months", label: "6+ months" },
    { value: "flexible", label: "Flexible" },
  ];

  // Custom dropdown indicator component
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          style={{
            transform: props.selectProps.menuIsOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <path
            d="M11.4928 0.828966C11.8634 1.1019 11.9426 1.62356 11.6696 1.99414C11.4576 2.28198 11.2456 2.55559 11.0596 2.7939C10.6884 3.26962 10.1773 3.90673 9.62197 4.54628C9.07027 5.18169 8.45857 5.83858 7.8875 6.34316C7.60291 6.59461 7.30879 6.82585 7.02198 6.99875C6.75805 7.15787 6.39538 7.33325 5.99861 7.33325C5.60184 7.33325 5.23915 7.15787 4.97521 6.99875C4.6884 6.82585 4.39428 6.59461 4.10969 6.34316C3.53862 5.83858 2.92692 5.18169 2.37522 4.54628C1.81993 3.90673 1.30883 3.26962 0.937566 2.7939C0.751591 2.55559 0.539552 2.28198 0.327558 1.99414C0.0546291 1.62356 0.133789 1.1019 0.504368 0.828967C0.653332 0.719255 0.826719 0.666445 0.998549 0.666589L5.9986 0.666589L10.9986 0.666589C11.1705 0.666444 11.3439 0.719254 11.4928 0.828966Z"
            fill="#071D21"
          />
        </svg>
      </components.DropdownIndicator>
    );
  };

  // Custom select styles
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "0px",
      border: "1px solid rgba(7, 29, 33, 0.08)",
      borderRadius: "100px",
      background: "transparent",
      fontSize: "16px",
      color: "#071D21",
      cursor: "pointer",
      // minHeight: '56px', // Match input field height
      // height: '56px',
      display: "flex",
      alignItems: "center",
      boxShadow: state.isFocused ? `0 0 0 1px ${hover}` : "none",
      "&:hover": {
        boxShadow: `0 0 0 1px ${hover}`,
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 20px",
      // minHeight: '54px',
      // height: '54px',
      display: "flex",
      alignItems: "center",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
      fontSize: "16px",
      margin: "0",
      position: "absolute",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#071D21",
      fontSize: "16px",
      margin: "0",
      position: "absolute",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "16px",
      border: "none",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#071D21"
        : state.isFocused
          ? "#F5F5F5"
          : "#FFF",
      color: state.isSelected ? "#FFF" : "#071D21",
      padding: "12px 20px",
      cursor: "pointer",
      fontSize: "16px",
      "&:hover": {
        backgroundColor: state.isSelected ? "#071D21" : "#F5F5F5",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      paddingTop: "0",
      paddingBottom: "0",
      height: "auto",
    }),
  };

  return (
    <StyledComponent className={"contact-form"}>
      <div className={"contact-form__wrapper"}>
        <div className={"contact-form__header"}>
          <h2 className={"split-up-delay"}>Request A Quote</h2>
          <div className={"contact-form__close"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                d="M14.791 19.0835L5.45767 2.91767"
                stroke="#071D21"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.9272 11.1151C16.9272 11.1151 16.1233 18.315 14.792 19.0836C13.4608 19.8522 6.82357 16.9484 6.82357 16.9484"
                stroke="#071D21"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit(onSubmit)}
          className={"contact-form__form"}
        >
          {/* Hidden input for Netlify form detection in JS-rendered forms */}
          <input type="hidden" name="form-name" value="contact" />
          {/* Honeypot field for spam protection - hidden from users */}
          <p className="hidden-field">
            <label>
              Don&apos;t fill this out if you&apos;re human:{" "}
              <input name="bot-field" />
            </label>
          </p>

          <div className={"form-group"}>
            <label className={"split-up-delay"} htmlFor="name">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  className={errors.name ? "error" : ""}
                />
              )}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className={"form-group"}>
            <label className={"split-up-delay"} htmlFor="email">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={errors.email ? "error" : ""}
                />
              )}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className={"form-group"}>
            <label className={"split-up-delay"} htmlFor="service">
              Select Service
            </label>
            <Controller
              name="service"
              control={control}
              rules={{ required: "Please select a service" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={serviceOptions}
                  placeholder="What Services Do You Need?"
                  styles={customSelectStyles}
                  components={{ DropdownIndicator }}
                  className={errors.service ? "react-select-error" : ""}
                  isSearchable={false}
                />
              )}
            />
            {errors.service && (
              <span className="error-message">{errors.service.message}</span>
            )}
          </div>

          <div className={"form-group"}>
            <label className={"split-up-delay"} htmlFor="timeline">
              Timeline
            </label>
            <Controller
              name="timeline"
              control={control}
              rules={{ required: "Please select a timeline" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={timelineOptions}
                  placeholder="What's Your Timeline?"
                  styles={customSelectStyles}
                  components={{ DropdownIndicator }}
                  className={errors.timeline ? "react-select-error" : ""}
                  isSearchable={false}
                />
              )}
            />
            {errors.timeline && (
              <span className="error-message">{errors.timeline.message}</span>
            )}
          </div>

          <div className={"form-group"}>
            <label className={"split-up-delay"} htmlFor="description">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="description"
                  placeholder="Tell us about your company and what you are looking for..."
                  rows={5}
                  className={errors.description ? "error" : ""}
                />
              )}
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className={"form-submit"}>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>

          {/* Success message */}
          {submitStatus === "success" && (
            <div className="form-status form-status--success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>
                Thank you! Your message has been sent successfully. We&apos;ll
                get back to you soon.
              </span>
            </div>
          )}

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="form-status form-status--error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span>
                Oops! Something went wrong. Please try again or contact us
                directly.
              </span>
            </div>
          )}

          <div className={"form-alternative"}>
            <p>
              Not Interested to submit the form?{" "}
              <a href="https://cal.com/techsferahq/30min" target="_blank">
                Book A Call Directly
              </a>
            </p>
          </div>
        </form>
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  .contact-form {
    &__wrapper {
      padding: 0;
      overflow: hidden;
    }

    &__header {
      background: #fff;
      border-radius: 30px;
      padding: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;

      h2 {
        font-weight: 700;
        color: #071d21;
        margin: 0;
        font-size: 24px;
      }

      &__close {
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background 0.3s ${Transition};

        &:hover {
          background: #f5f5f5;
        }
      }
    }

    &__form {
      padding: 25px;
      border-radius: 30px;
      background: #f5f5f5;

      .hidden-field {
        display: none;
      }

      .form-group {
        margin-bottom: 30px;

        label {
          display: block;
          font-weight: 500;
          color: #071d21;
          margin-bottom: 15px;
          font-size: 18px;
        }

        input,
        textarea {
          width: 100%;
          padding: 20px;
          border-radius: 100px;
          border: 1px solid rgba(7, 29, 33, 0.08);
          font-size: 16px;
          color: #071d21;
          background: transparent;
          transition: box-shadow 0.3s ${Transition};

          &::placeholder {
            color: #999;
          }

          &:focus {
            outline: none;
            box-shadow: 0 0 0 1px ${hover};
          }

          &.error {
            box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.3);
          }
        }

        textarea {
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
          border-radius: 25px;
        }

        .error-message {
          color: #dc3545;
          font-size: 14px;
          margin-top: 4px;
          display: block;
        }

        .react-select-error {
          .select__control {
            border: 1px solid #dc3545 !important;
            box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.3) !important;

            &:hover {
              border: 1px solid #dc3545 !important;
            }
          }
        }
      }

      .form-submit {
        margin: 30px 0 20px 0;

        .submit-button {
          width: 100%;
          padding: 16px 24px;
          background-color: #071d21;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 17px;
          font-weight: 700;
          font-family: "Bricolage Grotesque", sans-serif;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ${Transition};
          z-index: 1;

          &::before {
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            height: 100%;
            background-color: ${hover};
            transition: top 0.4s ${Transition};
            z-index: -1;
            border-radius: 100px;
          }

          &:hover:not(:disabled) {
            &::before {
              top: 0;
            }
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        }
      }

      .form-status {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px 20px;
        border-radius: 16px;
        margin-bottom: 20px;
        font-size: 15px;
        line-height: 1.5;
        animation: slideIn 0.3s ease-out;

        svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        &--success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #166534;

          svg {
            color: #22c55e;
          }
        }

        &--error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #991b1b;

          svg {
            color: #ef4444;
          }
        }
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .form-alternative {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #e5e5e5;

        p {
          color: #666;
          margin: 0;
          font-size: 16px;

          a {
            color: #071d21;
            text-decoration: underline;
            font-weight: 700;
            transition: color 0.3s ${Transition};

            &:hover {
              color: #000;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .contact-form {
      &__header {
        padding: 20px;

        h2 {
          font-size: 20px;
        }
      }

      &__form {
        padding: 20px;

        .form-group {
          margin-bottom: 20px;

          label {
            font-size: 17px;
            margin-bottom: 6px;
          }

          input,
          textarea {
            font-size: 16px;
          }
        }

        .form-submit {
          margin: 24px 0 16px 0;

          button {
            padding: 14px 16px !important;
            font-size: 17px;
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    .contact-form {
      &__header {
        border-radius: 20px;
      }

      &__form {
        border-radius: 20px;
        padding: 20px 15px;
      }
    }
    .contact-form__form .form-group textarea,
    .contact-form__form .form-group input {
      padding: 15px;
    }
  }
`;

export default ContactForm;
