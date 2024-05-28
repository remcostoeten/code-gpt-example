CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`userId` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY NOT NULL,
	`chat_id` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE no action
);
