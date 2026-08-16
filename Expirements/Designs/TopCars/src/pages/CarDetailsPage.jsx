import { useEffect, useState } from "react";
import {
  Modal,
  Tag,
  Divider,
  Descriptions,
  Button,
} from "antd";

import {
  ArrowLeft,
  Gauge,
  CarFront,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getCarById } from "../api/carApi";

const FALLBACK_IMAGE =
  "https://placehold.co/1200x800/e9e6dc/161513?text=Car+Image";

const formatCategory = (category) => {
  if (!category) return "Unknown";

  return category
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatPrice = (price) => {
  return `$${Number(price || 0).toLocaleString("en-US")}`;
};

function CarDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH CAR
  // ============================================================

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCarById(id);

        setCar(data);
      } catch (error) {
        console.error(
          "Failed to fetch car:",
          error
        );

        setError(
          "Unable to load car details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // ============================================================
  // CLOSE MODAL
  // ============================================================

  const handleClose = () => {
    navigate("/");
  };

  // ============================================================
  // IMAGE ERROR
  // ============================================================

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <Modal
      open={true}
      onCancel={handleClose}
      footer={null}
      centered
      destroyOnHidden
      width={2000}

      styles={{
        content: {
          padding: 0,
          overflow: "hidden",
          borderRadius: "16px",
        },

        body: {
          padding: 0,
        },
      }}
    >

      {/* ======================================================
          LOADING
      ======================================================= */}

      {loading && (
        <div className="w-full h-[500px] flex items-center justify-center">

          <div className="text-center">

            <div className="animate-spin w-8 h-8 border-2 border-[#161513] border-t-transparent rounded-full mx-auto" />

            <p className="text-[#8a887f] mt-4">
              Loading car details...
            </p>

          </div>

        </div>
      )}

      {/* ======================================================
          ERROR
      ======================================================= */}

      {!loading && error && (
        <div className="w-full h-[500px] flex items-center justify-center">

          <div className="text-center">

            <CarFront
              size={40}
              className="mx-auto text-[#a8a599]"
            />

            <h3 className="font-bold mt-4">
              Unable to load car
            </h3>

            <p className="text-[#8a887f] text-sm mt-2">
              {error}
            </p>

            <Button
              className="mt-5"
              onClick={handleClose}
            >
              Go Back
            </Button>

          </div>

        </div>
      )}

      {/* ======================================================
          CAR DETAILS
      ======================================================= */}

      {!loading && !error && car && (

        <div className="w-full h-[80vh] max-h-[750px] min-h-[550px] flex flex-col md:flex-row bg-[#f3f2ee]">

          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="relative w-full md:w-1/2 h-[260px] md:h-full bg-[#e9e6dc] overflow-hidden">

            <img
              src={
                car.imageUrl ||
                FALLBACK_IMAGE
              }
              alt={`${car.name} ${car.model}`}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />

            {/* Gradient */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category */}

            <div className="absolute top-5 left-5">

              <Tag
                color="red"
                className="px-3 py-1 text-xs font-semibold"
              >
                {formatCategory(
                  car.category
                )}
              </Tag>

            </div>

            {/* Car name */}

            <div className="absolute bottom-5 left-5 text-white">

              <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                {car.name}
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold">
                {car.model}
              </h1>

            </div>

          </div>

          {/* ==================================================
              RIGHT
          ================================================== */}

          <div className="w-full md:w-1/2 h-full overflow-y-auto hide-scrollbar p-5 md:p-7">

            {/* Back */}

            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-xs text-[#8a887f] hover:text-[#161513] transition-colors mb-6"
            >

              <ArrowLeft size={15} />

              Back to cars

            </button>

            {/* Brand */}

            <p className="text-xs uppercase tracking-[0.2em] text-[#8a887f]">
              {car.name}
            </p>

            {/* Model */}

            <h2 className="text-3xl font-extrabold mt-1">
              {car.model}
            </h2>

            {/* Price */}

            <p className="text-2xl font-extrabold font-mono mt-3">
              {formatPrice(car.price)}
            </p>

            <Divider />

            {/* Description */}

            <div>

              <h3 className="text-xs uppercase tracking-[0.15em] font-bold mb-3">
                About
              </h3>

              <p className="text-[#6d6b62] text-sm leading-6">
                {car.description}
              </p>

            </div>

            <Divider />

            {/* Specifications */}

            <Descriptions
              title="Specifications"
              bordered
              size="small"
              column={1}
            >

              <Descriptions.Item label="Brand">
                {car.name}
              </Descriptions.Item>

              <Descriptions.Item label="Model">
                {car.model}
              </Descriptions.Item>

              <Descriptions.Item label="Category">
                {formatCategory(
                  car.category
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Color">
                {car.color}
              </Descriptions.Item>

              <Descriptions.Item label="Engine">
                {car.engine}
              </Descriptions.Item>

              <Descriptions.Item label="Top Speed">

                <span className="flex items-center gap-2">

                  <Gauge size={14} />

                  {car.speed} km/h

                </span>

              </Descriptions.Item>

            </Descriptions>

            {/* Button */}

            <Button
              type="primary"
              size="large"
              block
              className="mt-6"
            >
              I'm Interested
            </Button>

          </div>



        </div>
      )}

    </Modal>
  );
}

export default CarDetailsPage;