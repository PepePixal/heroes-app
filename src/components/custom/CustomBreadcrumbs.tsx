
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { Link } from "react-router";

interface Props {
    currentPage: string;
}

export const CustomBreadcrumbs = ( { currentPage }: Props) => {

  return (
    <Breadcrumb className="my-5">
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink>
                <Link to='/'>Inicio</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator>
                <SlashIcon />
            </BreadcrumbSeparator>
            
            <BreadcrumbItem>
            <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
            </BreadcrumbItem>
            
        </BreadcrumbList>
    </Breadcrumb>
  )
}
