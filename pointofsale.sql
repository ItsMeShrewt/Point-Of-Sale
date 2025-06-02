-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2025 at 07:39 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pointofsale`
--

-- --------------------------------------------------------

--
-- Table structure for table `damage`
--

CREATE TABLE `damage` (
  `id` int(11) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `section` varchar(100) NOT NULL,
  `quantity_damaged` int(11) NOT NULL,
  `damage_reason` text NOT NULL,
  `damage_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `damage`
--

INSERT INTO `damage` (`id`, `product_id`, `product_name`, `section`, `quantity_damaged`, `damage_reason`, `damage_date`) VALUES
(18, 13, 'Flatwall Enamel', 'Main', 1, 'q', '2025-05-28 09:38:29'),
(19, 15, 'Quick Drying Enamel', 'Main', 5, 'q', '2025-05-29 01:47:54');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(10) NOT NULL,
  `section` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `price` varchar(50) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` enum('Available','Low Stock','Out of Stock') NOT NULL DEFAULT 'Available',
  `is_archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `section`, `product_name`, `brand`, `description`, `unit`, `price`, `quantity`, `status`, `is_archived`) VALUES
(13, 'Main', 'Flatwall Enamel', 'Welcoat', 'White', '4 Liters', '880', 0, 'Out of Stock', 0),
(14, 'Main', 'Lacquer Glazing Putty', 'Premium', 'White', '4 Liters', '880', 0, 'Out of Stock', 0),
(15, 'Main', 'Quick Drying Enamel', 'Premium', 'White', '4 Liters', '800', 25, 'Low Stock', 0),
(16, 'Left', 'Roof nails', 'N/A', '8\"', 'Kilogram', '100', NULL, 'Available', 1),
(17, 'Left', 'Mild Steel Square Hollow Bar', 'N/A', '1x1', 'Piece', '400', 22, 'Low Stock', 0),
(18, 'Front', 'Bamboo', 'N/A', 'Set', 'Piece', '85', 5, 'Low Stock', 0),
(19, 'Front', 'Sand', 'N/A', 'N/A', 'Cubic', '800', NULL, 'Available', 1),
(20, 'Front', 'Gravel', 'N/A', 'N/A', 'Cubic', '1100', NULL, 'Available', 1),
(21, 'Main', 'Varnish', 'GrandMaster', '350 ml', 'Piece', '75', 40, 'Available', 1),
(22, 'Main', 'Nails', 'N/A', '1\"', 'Kilogram', '80', NULL, 'Available', 1),
(23, 'Main', 'Door Knobs', 'Koji', 'N/A', 'Piece', '500', 6, 'Low Stock', 1),
(24, 'Main', 'Paint Brush', 'N/A', '1\"', 'Piece', '25', 11, 'Low Stock', 0),
(25, 'Main', 'Paint Brush', 'N/A', '4\"', 'Piece', '110', 11, 'Low Stock', 0),
(26, 'Left', 'Cement', 'Holcim', 'N/A', 'Piece', '220', 50, 'Available', 0),
(27, 'Left', 'Plywood', 'Marine', '1/4', 'Piece', '450', 29, 'Available', 0),
(28, 'Left', 'Plywood', 'Top Forest', '3/4', 'Piece', '1250', 35, 'Available', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(10) NOT NULL,
  `inventory_id` int(10) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_address` varchar(255) NOT NULL,
  `customer_phone` varchar(11) NOT NULL,
  `price` varchar(50) NOT NULL,
  `delivery_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_amount` double NOT NULL,
  `payment_type` varchar(50) NOT NULL,
  `method` varchar(50) NOT NULL,
  `is_returned` tinyint(1) NOT NULL DEFAULT 0,
  `return_reason` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `inventory_id`, `customer_name`, `customer_address`, `customer_phone`, `price`, `delivery_fee`, `discount`, `total_amount`, `payment_type`, `method`, `is_returned`, `return_reason`, `quantity`, `order_date`) VALUES
(20250070, 15, 'Richie', '', '', '800', '0.00', '0.00', 800, 'Cash', 'Pick-up', 0, NULL, 1, '2025-05-30 05:44:33'),
(20250071, 24, 'Drew', '', '', '25', '0.00', '0.00', 25, 'Cash', 'Pick-up', 0, NULL, 1, '2025-05-30 05:44:46'),
(20250074, 15, 'Richie Dadubo', 'Gusa', '09851893711', '800', '100.00', '0.00', 900, 'Cash', 'Delivery', 0, NULL, 1, '2025-05-30 06:09:03'),
(20250076, 15, 'Drew', '', '', '800', '0.00', '0.00', 800, 'Cash', 'Pick-up', 0, NULL, 1, '2025-05-31 13:41:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `damage`
--
ALTER TABLE `damage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `damage_product` (`product_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Test` (`inventory_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `damage`
--
ALTER TABLE `damage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20250077;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `damage`
--
ALTER TABLE `damage`
  ADD CONSTRAINT `damage_product` FOREIGN KEY (`product_id`) REFERENCES `inventory` (`id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Test` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
