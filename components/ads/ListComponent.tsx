"use client";
import { AdsData } from "@/utils/data";
import React, { Suspense, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { ChevronRight, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { oswald } from "@/lib/fonts";
import Image from "next/image";

const DATA = AdsData;

const ListComponent = () => {
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(
    () =>
      DATA.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText]
  );

  return (
    <div className="w-full flex flex-col">
      {/* Top part with input search */}
      <div className="w-full">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-600
            dark:text-gray-400"
          />

          <Input
            type="search"
            placeholder="Chercher..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            className="pl-11 py-5"
          />
        </div>
      </div>
      {/* List of items */}
      <Suspense
        fallback={
          <div className="text-center text-gray-500 dark:text-gray-400">
            chargement...
          </div>
        }
      >
        <div className="grid w-full gap-10 mt-10">
          {filteredData.length < 1 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Aucun résultat trouvé
            </div>
          ) : (
            filteredData.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={cn(oswald.className, "text-lg")}>
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-4">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-64 xl:h-72 object-cover"
                    priority
                    width={1000}
                    height={800}
                  />
                </CardContent>
                <CardFooter className="relative">
                  <Link href={"/publicites/" + item.slug}>
                    <Button variant={"outline"}>
                      <span>Voir la publicité</span>
                      <ChevronRight />
                    </Button>
                  </Link>

                  {/* absolute icon */}
                  <div className="absolute bottom-0 right-4">
                    <item.Icon
                      className={`size-7 
                    ${index % 2 === 0 ? "text-green-600" : "text-blue-600"}
                        `}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default ListComponent;
