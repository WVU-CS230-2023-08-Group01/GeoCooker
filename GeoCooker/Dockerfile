#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs


FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

ARG PASSWORD_ENV_SEEDED

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

RUN dotnet dev-certs https -ep /https/GeoCooker.pfx -p ${PASSWORD_ENV_SEEDED}

WORKDIR /src
COPY ["GeoCooker/GeoCooker.csproj", "GeoCooker/"]
RUN dotnet restore "GeoCooker/GeoCooker.csproj"

COPY . .
WORKDIR "/src/GeoCooker"
RUN dotnet build "GeoCooker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GeoCooker.csproj" -c Release -o /app/publish /p:UseAppHost=false



FROM base AS final
COPY --from=build /https/* /https/
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GeoCooker.dll"]
