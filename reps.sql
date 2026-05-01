--
-- PostgreSQL database dump
--

\restrict bXGE4r1zDzUGIkO2uPrvr2qjgPauTLICvMwnp3q8aelT59BYGYLauboeizB7gbV

-- Dumped from database version 15.17
-- Dumped by pg_dump version 15.17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: representatives; Type: TABLE DATA; Schema: public; Owner: bnb_user
--

COPY public.representatives (id, name, company, email, phone, region, updated_at, created_at) FROM stdin;
3	Juarez	\N	contato@bebiluminacao.com	55 62 8129-8134		2026-04-28 02:00:44.381+00	2026-04-28 02:00:44.381+00
4	Wagner	\N	contato@bebiluminacao.com	55 63 8403-8996	\N	2026-04-28 02:02:28.647+00	2026-04-28 02:02:28.646+00
5	Daniel	Compenergy Solutions	contato@bebiluminacao.com	55 66 9648-6138	\N	2026-04-28 02:03:07.314+00	2026-04-28 02:03:07.313+00
6	Luiz Alberto	\N	contato@bebiluminacao.com	55 21 99120-0162	\N	2026-04-28 02:04:47.305+00	2026-04-28 02:04:47.305+00
7	Mateus Henrique	\N	contato@bebiluminacao.com	55 16 99710-0465	\N	2026-04-28 02:05:32.799+00	2026-04-28 02:05:32.799+00
8	Flávio Júnior	\N	contato@bebiluminacao.com	55 53 8166-7000	\N	2026-04-28 02:06:13.418+00	2026-04-28 02:06:13.418+00
9	Glauco	AVG Representações	avgrep@yahoo.com.br	55 61 9339-0659		2026-04-28 02:07:25.425+00	2026-04-28 02:07:25.425+00
1	Bruno Pereira	\N	bruno@bebiluminacao.com	55 62 93501-1502	\N	2026-04-28 02:07:42.271+00	2026-04-14 00:35:21.329+00
10	José Gomes	Portal Representa	portalrepresenta@gmail.com	55 99 8124-9377	\N	2026-04-28 02:08:58.756+00	2026-04-28 02:08:58.755+00
11	Alex Ferrari	\N	contato@bebiluminacao.com	55 63 9233-3528	\N	2026-04-28 02:10:21.883+00	2026-04-28 02:10:15.703+00
2	Júnior	\N	contato@bebiluminacao.com	55 98 9114-5515	\N	2026-04-28 02:11:06.006+00	2026-04-28 02:00:17.339+00
\.


--
-- Name: representatives_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bnb_user
--

SELECT pg_catalog.setval('public.representatives_id_seq', 11, true);


--
-- PostgreSQL database dump complete
--

\unrestrict bXGE4r1zDzUGIkO2uPrvr2qjgPauTLICvMwnp3q8aelT59BYGYLauboeizB7gbV

