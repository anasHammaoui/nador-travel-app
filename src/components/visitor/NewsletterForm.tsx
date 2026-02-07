import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Mail, User, Loader2, CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { subscribe, resetNewsletterState } from "../../store/slices/newsletterSlice";
import type { NewsletterSubscription } from "../../types";
import { useEffect } from "react";

const schema = yup.object({
  email: yup
    .string()
    .required("L'email est obligatoire")
    .email("Format d'email invalide"),
  firstName: yup
    .string()
    .required("Le prénom est obligatoire")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères"),
});

export default function NewsletterForm() {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((s) => s.newsletter);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterSubscription>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (success) {
      toast.success("✅ Inscription réussie! Consultez votre boîte mail.");
      reset();
      // Reset state after short delay
      const timer = setTimeout(() => dispatch(resetNewsletterState()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, reset, dispatch]);

  useEffect(() => {
    if (error) {
      if (error.includes("409") || error.toLowerCase().includes("déjà")) {
        toast.warning("⚠️ Cet email est déjà inscrit.");
      } else {
        toast.error("❌ Erreur de connexion. Réessayez plus tard.");
      }
      dispatch(resetNewsletterState());
    }
  }, [error, dispatch]);

  const onSubmit = (data: NewsletterSubscription) => {
    dispatch(subscribe(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-3 w-full max-w-2xl mx-auto"
      noValidate
    >
      {/* First name */}
      <div className="flex-1">
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
          <input
            {...register("firstName")}
            type="text"
            placeholder="Votre prénom"
            aria-label="Prénom"
            disabled={loading}
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
              errors.firstName
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:border-primary focus:ring-primary/20"
            }`}
          />
        </div>
        {errors.firstName && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex-1">
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
          <input
            {...register("email")}
            type="email"
            placeholder="votre@email.com"
            aria-label="Email"
            disabled={loading}
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:border-primary focus:ring-primary/20"
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || success}
        className="flex items-center justify-center gap-2 rounded-lg bg-white text-primary font-semibold px-6 py-2.5 text-sm hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary whitespace-nowrap"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi...
          </>
        ) : success ? (
          <>
            <CheckCircle className="h-4 w-4 text-green" />
            Inscrit!
          </>
        ) : (
          "S'inscrire"
        )}
      </button>
    </form>
  );
}
