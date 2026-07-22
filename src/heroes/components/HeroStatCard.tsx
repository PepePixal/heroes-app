import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropsWithChildren } from "react";


// extends PropsWithChildrren para poder recibir la prop children
interface Props extends PropsWithChildren {
    title: string;
    icon: React.ReactNode;
    // children: React.ReactNode   //otra forma de definir la prop children 
}

export const HeroStatCard = ({ title, icon, children }: Props) => {

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
  )

}
