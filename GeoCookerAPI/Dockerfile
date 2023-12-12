#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

ARG PASSWORD_ENV_SEEDED

RUN dotnet dev-certs https -ep /https/GeoCookerAPI.pfx -p ${PASSWORD_ENV_SEEDED}

WORKDIR /src
COPY ["GeoCookerAPI/GeoCookerAPI.csproj", "GeoCookerAPI/"]
RUN dotnet restore "GeoCookerAPI/GeoCookerAPI.csproj"

COPY . .
WORKDIR "/src/GeoCookerAPI"
RUN dotnet build "GeoCookerAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GeoCookerAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false


FROM base AS final
COPY --from=build /https/* /https/
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GeoCookerAPI.dll"]
