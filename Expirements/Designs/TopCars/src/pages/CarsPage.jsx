import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getAllCars } from "../api/carApi";
import CarCard from "../components/CarCard";

const categories = [
  "ALL",
  "SUPER_CARS",
  "VINTAGE",
  "LUXURY",
  "RACING",
];

const formatCategory = (category) => {
  if (!category) return "Unknown";

  return category
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

function CarsPage() {
  const [cars, setCars] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  const [query, setQuery] = useState("");

  const [sort, setSort] =
    useState("featured");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ============================================================
  // FETCH
  // ============================================================

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllCars();

        console.log(
          "Cars:",
          data
        );

        setCars(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Failed to fetch cars:",
          error
        );

        setError(
          "Unable to load cars. Please check your backend."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ============================================================
  // FILTER
  // ============================================================

  const filteredCars = useMemo(() => {

    let list = [...cars];

    // category

    if (
      selectedCategory !== "ALL"
    ) {
      list = list.filter(
        (car) =>
          car.category ===
          selectedCategory
      );
    }

    // search

    if (query.trim()) {

      const search =
        query
          .trim()
          .toLowerCase();

      list = list.filter(
        (car) => {

          const name =
            String(
              car.name || ""
            ).toLowerCase();

          const model =
            String(
              car.model || ""
            ).toLowerCase();

          const category =
            String(
              car.category || ""
            ).toLowerCase();

          return (
            name.includes(search) ||
            model.includes(search) ||
            category.includes(search)
          );
        }
      );
    }

    // sorting

    if (
      sort === "price-asc"
    ) {
      list.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (
      sort === "price-desc"
    ) {
      list.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "speed") {
      list.sort(
        (a, b) =>
          Number(b.speed || 0) -
          Number(a.speed || 0)
      );
    }

    return list;

  }, [
    cars,
    selectedCategory,
    query,
    sort,
  ]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

        {Array.from({
          length: 6,
        }).map((_, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden border border-[#e5e2d8]"
          >

            <div className="h-48 bg-[#e9e6dc] animate-pulse" />

            <div className="p-4 space-y-3">

              <div className="h-4 w-2/3 bg-[#e9e6dc] rounded animate-pulse" />

              <div className="h-3 w-1/3 bg-[#e9e6dc] rounded animate-pulse" />

              <div className="h-8 w-full bg-[#e9e6dc] rounded animate-pulse" />

            </div>

          </div>

        ))}

      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">

        <div className="bg-white rounded-2xl p-8 text-center border border-[#e5e2d8]">

          <h2 className="font-bold text-lg">
            Something went wrong
          </h2>

          <p className="text-[#8a887f] text-sm mt-2">
            {error}
          </p>

        </div>

      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <>

      {/* HEADER */}

      <header className="mb-5">

        <div className="flex flex-wrap items-end justify-between gap-3 mb-4">

          <div>

            <p className="text-[12px] text-[#8a887f] mb-1">
              Explore the collection
            </p>

            <h2 className="text-[26px] font-extrabold uppercase">
              {selectedCategory === "ALL"
                ? "All Cars"
                : formatCategory(
                    selectedCategory
                  )}
            </h2>

          </div>

          <div className="bg-white rounded-xl px-4 py-2.5 border border-[#e5e2d8] font-mono text-sm">

            <span className="text-[#8a887f]">
              Cars
            </span>

            <span className="ml-2 font-bold">
              {String(
                filteredCars.length
              ).padStart(2, "0")}
            </span>

          </div>

        </div>

        {/* SEARCH */}

        <div className="flex flex-col sm:flex-row gap-2.5">

          <div className="flex flex-1 items-center gap-2 bg-white border border-[#e5e2d8] rounded-xl px-3.5 py-2.5">

            <Search
              size={16}
              className="text-[#8a887f]"
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Search by brand or model"
              className="w-full bg-transparent outline-none text-sm"
            />

            {query && (
              <button
                onClick={() =>
                  setQuery("")
                }
              >
                <X size={14} />
              </button>
            )}

          </div>

          {/* SORT */}

          <div className="flex items-center gap-2 bg-white border border-[#e5e2d8] rounded-xl px-3.5 py-2.5">

            <SlidersHorizontal
              size={15}
              className="text-[#8a887f]"
            />

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
              className="bg-transparent outline-none text-sm"
            >

              <option value="featured">
                Featured
              </option>

              <option value="price-asc">
                Price: Low to High
              </option>

              <option value="price-desc">
                Price: High to Low
              </option>

              <option value="speed">
                Top Speed
              </option>

            </select>

          </div>

        </div>

      </header>

      {/* CATEGORY */}

      <div className="flex flex-wrap gap-2 mb-5">

        {categories.map(
          (category) => {

            const active =
              selectedCategory ===
              category;

            const count =
              category === "ALL"
                ? cars.length
                : cars.filter(
                    (car) =>
                      car.category ===
                      category
                  ).length;

            return (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`
                  px-3
                  py-2
                  rounded-lg
                  text-xs
                  font-semibold
                  transition
                  ${
                    active
                      ? "bg-[#161513] text-white"
                      : "bg-white text-[#6d6b62] border border-[#e5e2d8] hover:border-[#161513]"
                  }
                `}
              >

                {formatCategory(
                  category
                )}

                <span className="ml-2 opacity-50">
                  {count}
                </span>

              </button>
            );
          }
        )}

      </div>

      {/* CARS */}

      {filteredCars.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredCars.map(
            (car) => (
              <CarCard
                key={car.id}
                car={car}
              />
            )
          )}

        </div>

      ) : (

        <div className="flex items-center justify-center min-h-[400px]">

          <div className="text-center">

            <Search
              size={32}
              className="mx-auto text-[#a8a599]"
            />

            <h3 className="font-bold mt-3">
              No cars found
            </h3>

            <p className="text-[#8a887f] text-sm mt-1">
              Try another search or category.
            </p>

          </div>

        </div>

      )}

    </>
  );
}

export default CarsPage;