-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 10 Jul 2024 pada 08.28
-- Versi server: 8.0.30
-- Versi PHP: 8.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bkk_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` int NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `contactInfo` text NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `jobs`
--

INSERT INTO `jobs` (`id`, `uuid`, `title`, `description`, `requirements`, `contactInfo`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'ca0a8135-4334-44d7-a94c-7905198b3253', 'Software Engineer', 'Responsible for developing and maintaining software applications.', 'Familiar with HTML, CSS, JS', '0892442582562', 4, '2024-07-04 09:26:15', '2024-07-04 09:26:15'),
(3, 'c14d992f-c9b1-46b1-8e54-32a2aaf0b9bb', 'Software Engineer 3', 'Responsible for developing and maintaining software applications.', 'Familiar with HTML, CSS, JS', '0892442582562', 1, '2024-07-04 09:34:09', '2024-07-04 09:34:09'),
(4, '78b76d13-6bc6-473b-8b55-59cf619cbba3', 'Software Engineer 4', 'Responsible for developing and maintaining software applications.', 'Familiar with HTML, CSS, JS', '0892442582562', 1, '2024-07-04 09:34:15', '2024-07-04 09:34:15'),
(5, 'd304e88e-c759-48f2-8650-76c9ab521666', 'UI/UX', 'Responsible for developing and maintaining software applications.', 'Familiar with HTML, CSS, JS', '0892442582562', 1, '2024-07-04 09:43:47', '2024-07-04 09:43:47'),
(13, 'e8a6b78d-8d15-473f-b911-ccbb2fbc9752', 'Tester 1', 'Responsible for developing and maintaining software applications.', 'Familiar with HTML, CSS, JS', '0892442582562', 1, '2024-07-10 08:17:33', '2024-07-10 08:17:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('byOik91NcpmS2TDpeOmOfKj8j1PRAer0', '2024-07-11 08:21:31', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"64586bf9-c9a0-469b-a3b8-3a214f3b6267\"}', '2024-07-10 08:18:38', '2024-07-10 08:21:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '64586bf9-c9a0-469b-a3b8-3a214f3b6267', 'Shevabey', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$C9nKbxabzNWa3M4wRbInPg$xWlpxK99Z3VNzTBn2MNRS7d+56jia9152h94wrVKA48', 'admin', '2024-07-01 05:52:51', '2024-07-01 05:52:51'),
(3, '7b0479d5-72ef-4c37-b997-02d9cf634a0c', 'Raka', 'raka@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$7P81QzLQImWhOU7yP2apBg$xf/Mx5/YdPyuISkBhtl6JRq5h6yNESyXT7y3xsqI5Zk', 'user', '2024-07-02 07:53:51', '2024-07-02 07:55:24'),
(4, '966c9273-2cb6-44c8-a5e1-5beb8873f720', 'Rahman', 'rahman@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$/Y6CCuxHQ3eeYbO5Di6ySg$3+/WAVg0VngT+nG6FWjwyS98wvacLbu3UMlXpY8W1KY', 'company', '2024-07-04 07:00:13', '2024-07-04 07:00:13'),
(6, '17311c6c-caed-4b46-ab3f-2061a3e35c4e', 'Romli', 'romli@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$KV8LPLpVckOJpBrogc6fUQ$O0sS6VVVoacmI4aJMoFx8v0/udjfoukKjy1OlbFunXA', 'applicant', '2024-07-10 07:13:16', '2024-07-10 07:13:16');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
