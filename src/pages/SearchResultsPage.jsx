import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/utilities/Pagination";
import gearImg from "../assets/Gear-img.png";
import bglogo from "../assets/nobg-logo .png";
import { loadCatalogue, searchCatalogue } from "../config/catalogue";
import { ASSET_BASE_URL } from "../config/environment";

const RECORDS_PER_PAGE = 10;

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [catalogue, setCatalogue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadCatalogue()
      .then((data) => {
        if (cancelled) return;
        setCatalogue(data);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(
    () => (catalogue ? searchCatalogue(catalogue, query) : []),
    [catalogue, query],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / RECORDS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const visible = results.slice(
    (page - 1) * RECORDS_PER_PAGE,
    page * RECORDS_PER_PAGE,
  );

  // Which fields the whole result set matched on — tells the user why a part
  // number query surfaced something whose name looks unrelated.
  const matchedIn = useMemo(() => {
    const labels = [];
    results.forEach((result) => {
      result.matchedIn.forEach((label) => {
        if (!labels.includes(label)) labels.push(label);
      });
    });
    return labels;
  }, [results]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, query]);

  const goToPage = (nextPage) => {
    setSearchParams({ q: query, page: String(nextPage) });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFED00_-60%,#FFFFFF_20%)] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url(${bglogo})`,
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
        }}
      />

      <main className="max-w-7xl mx-auto py-10 px-6 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-[2px] bg-gray-300" />
          <div className="text-xl md:text-2xl font-bold uppercase text-gray-800 whitespace-nowrap">
            Search Query : {query}
          </div>
          <div className="flex-1 h-[2px] bg-gray-300" />
        </div>

        {!loading && !error && (
          <p className="text-center text-sm text-gray-500 mb-10">
            {results.length} {results.length === 1 ? "result" : "results"}
            {matchedIn.length > 0 && (
              <span className="text-gray-400">
                {" "}
                &middot; matched in {matchedIn.join(", ")}
              </span>
            )}
          </p>
        )}

        {loading && <p className="text-center">Loading...</p>}

        {error && (
          <p className="text-center text-red-500">
            Could not load the catalogue. Please check your connection and try
            again.
          </p>
        )}

        {!loading && !error && results.length === 0 && (
          <p className="text-center">
            No products found for &ldquo;{query}&rdquo;. Try a part number, GG
            number, model, brand or description.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map(({ product, matchedIn: fields }) => (
            <ProductCard
              key={product._id}
              product={{
                id: product._id,
                name: product.name,
                partNo:
                  product?.partNo || product?.productDetail?.[0]?.partNo || "-",
                specification:
                  product?.specification ||
                  product?.productDetail?.[0]?.specification ||
                  "-",
                img: product?.images?.[0]
                  ? `${ASSET_BASE_URL}/${product.images[0]}`
                  : gearImg,
                matchedIn: fields,
              }}
            />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </main>
    </div>
  );
};

export default SearchResultsPage;
