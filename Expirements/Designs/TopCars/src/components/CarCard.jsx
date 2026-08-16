import { Gauge, Zap, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://placehold.co/900x600/e9e6dc/161513?text=Car+Image";

const formatCategory = (category) => {
  if (!category) return "Unknown";

  return category
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

const formatPrice = (price) => {
  return `$${Number(price || 0).toLocaleString(
    "en-US"
  )}`;
};

function CarCard({ car }) {

  const navigate = useNavigate();

  const handleImageError = (
    event
  ) => {
    event.currentTarget.onerror =
      null;

    event.currentTarget.src =
      FALLBACK_IMAGE;
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#e5e2d8] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_-14px_rgba(22,21,19,0.25)]">

      {/* IMAGE */}

      <div className="relative w-full h-48 bg-[#e9e6dc] overflow-hidden">

        <img
          src={
            car.imageUrl ||
            FALLBACK_IMAGE
          }
          alt={`${car.name} ${car.model}`}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* CATEGORY */}

        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-[#161513]/85 text-white px-2.5 py-1 rounded-md">
          {formatCategory(
            car.category
          )}
        </span>

      </div>

      {/* CONTENT */}

      <div className="p-4">

        {/* BRAND */}

        <p className="text-[11px] uppercase tracking-wider text-[#a8a599]">
          {car.name}
        </p>

        {/* MODEL */}

        <h3 className="text-[19px] font-extrabold mb-3">
          {car.model}
        </h3>

        {/* SPECS */}

        <div className="flex flex-col gap-2 mb-4 text-[11px] font-mono text-[#6d6b62]">

          <span className="flex items-center gap-2">

            <Gauge size={14} />

            {car.speed} km/h

          </span>

          <span className="flex items-center gap-2">

            <Zap size={14} />

            {car.engine}

          </span>

        </div>

        {/* PRICE */}

        <div className="flex items-center justify-between pt-3.5 border-t border-[#eeece4]">

          <div>

            <p className="text-[10px] uppercase tracking-wider text-[#a8a599]">
              Price
            </p>

            <p className="text-[18px] font-extrabold font-mono">
              {formatPrice(
                car.price
              )}
            </p>

          </div>

          {/* DETAILS */}

          <button
            onClick={() =>
              navigate(
                `/cars/${car.id}`
              )
            }
            className="flex items-center gap-1 px-3.5 py-2 bg-[#161513] text-white rounded-lg text-[12px] font-semibold hover:bg-[#e8432f] transition-colors"
          >

            Details

            <ArrowUpRight
              size={13}
            />

          </button>

        </div>

      </div>

    </article>
  );
}

export default CarCard;