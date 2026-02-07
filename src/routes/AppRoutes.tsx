import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

const HomePage = lazy(() => import("../pages/visitor/HomePage"));
const PlacesListPage = lazy(() => import("../pages/visitor/PlacesListPage"));
const PlaceDetailPage = lazy(() => import("../pages/visitor/PlaceDetailPage"));
const NotFoundPage = lazy(() => import("../pages/visitor/NotFoundPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<PlacesListPage />} />
        <Route path="/places/:id" element={<PlaceDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
