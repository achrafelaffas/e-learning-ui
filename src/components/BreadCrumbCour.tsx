import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function BreadcrumbDemo() {
  const navigate = useNavigate();
  const location = useLocation();

  const [firstSegment, setFirstSegment] = useState("");

  const getLocation = (): string => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.length > 0 ? `/${pathSegments[0]}` : "/";
  };

  useEffect(() => {
    setFirstSegment(getLocation());
  }, [location]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        
        <BreadcrumbItem onClick={() => navigate(-2)} className="cursor-pointer">
          {firstSegment && firstSegment == "/matieres" ? (
            <BreadcrumbPage>matieres</BreadcrumbPage>
          ) : (
            <span>Matieres</span>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem onClick={() => navigate(-1)} className="cursor-pointer">
          {firstSegment && firstSegment == "/cours" ? (
            <BreadcrumbPage>cours</BreadcrumbPage>
          ) : (
            <span>Cours</span>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem className="cursor-pointer">
            <span>Chapitres</span>
          
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
