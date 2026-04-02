-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ComputerType" AS ENUM ('DESKTOP', 'NOTEBOOK', 'SERVER', 'VM', 'OTHER');

-- CreateEnum
CREATE TYPE "ComputerRole" AS ENUM ('USER', 'SERVER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "department_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" SERIAL NOT NULL,
    "computer_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returned_at" TIMESTAMP(3),

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statuses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "device_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "computers" (
    "id" SERIAL NOT NULL,
    "glpiId" INTEGER,
    "hostname" TEXT NOT NULL,
    "hostFisico" TEXT,
    "nameHaperv" TEXT,
    "mainIp" VARCHAR(45) NOT NULL,
    "alternateUser" TEXT,
    "user" TEXT,
    "type" "ComputerType" NOT NULL DEFAULT 'DESKTOP',
    "role" "ComputerRole" NOT NULL DEFAULT 'USER',
    "manufacturer" TEXT,
    "modelName" TEXT,
    "serial" TEXT,
    "osName" TEXT,
    "osVersion" TEXT,
    "osArch" TEXT,
    "cpu" TEXT,
    "ram" TEXT,
    "hd" TEXT,
    "statusId" INTEGER,
    "locationId" INTEGER,
    "deviceModelId" INTEGER,
    "lastSync" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "computers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "network_interfaces" (
    "id" SERIAL NOT NULL,
    "glpiId" INTEGER,
    "name" TEXT,
    "macAddress" TEXT,
    "ipAddress" VARCHAR(45),
    "computerId" INTEGER NOT NULL,

    CONSTRAINT "network_interfaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volumes" (
    "id" SERIAL NOT NULL,
    "glpiId" INTEGER,
    "mountPoint" TEXT,
    "capacityGb" DOUBLE PRECISION NOT NULL,
    "computerId" INTEGER NOT NULL,

    CONSTRAINT "volumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "softwares" (
    "id" SERIAL NOT NULL,
    "glpiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT,
    "publisher" TEXT,

    CONSTRAINT "softwares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software_on_computers" (
    "computerId" INTEGER NOT NULL,
    "softwareId" INTEGER NOT NULL,

    CONSTRAINT "software_on_computers_pkey" PRIMARY KEY ("computerId","softwareId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "statuses_name_key" ON "statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "device_models_name_key" ON "device_models"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_key" ON "locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "computers_glpiId_key" ON "computers"("glpiId");

-- CreateIndex
CREATE UNIQUE INDEX "computers_mainIp_key" ON "computers"("mainIp");

-- CreateIndex
CREATE UNIQUE INDEX "softwares_glpiId_key" ON "softwares"("glpiId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_computer_id_fkey" FOREIGN KEY ("computer_id") REFERENCES "computers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "computers" ADD CONSTRAINT "computers_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "computers" ADD CONSTRAINT "computers_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "computers" ADD CONSTRAINT "computers_deviceModelId_fkey" FOREIGN KEY ("deviceModelId") REFERENCES "device_models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "network_interfaces" ADD CONSTRAINT "network_interfaces_computerId_fkey" FOREIGN KEY ("computerId") REFERENCES "computers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volumes" ADD CONSTRAINT "volumes_computerId_fkey" FOREIGN KEY ("computerId") REFERENCES "computers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_on_computers" ADD CONSTRAINT "software_on_computers_computerId_fkey" FOREIGN KEY ("computerId") REFERENCES "computers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_on_computers" ADD CONSTRAINT "software_on_computers_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "softwares"("id") ON DELETE CASCADE ON UPDATE CASCADE;
