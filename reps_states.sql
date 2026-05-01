--
-- PostgreSQL database dump
--

\restrict wR1MxOWuPlqxdYcwVI1vaTwwlLkPFXrL0YKSbS5TS0r3aCWHr3ox4BWqSGk0QTf

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
-- Data for Name: representatives_states; Type: TABLE DATA; Schema: public; Owner: bnb_user
--

COPY public.representatives_states ("order", parent_id, value, id) FROM stdin;
1	3	GO	4
1	4	PA	5
2	4	TO	6
1	5	MT	7
1	6	RJ	8
1	7	SP	9
1	8	RS	10
1	9	DF	11
2	9	GO	12
1	1	GO	13
1	10	MA	14
1	11	TO	17
2	11	PA	18
1	2	MA	19
2	2	PI	20
\.


--
-- Name: representatives_states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bnb_user
--

SELECT pg_catalog.setval('public.representatives_states_id_seq', 20, true);


--
-- PostgreSQL database dump complete
--

\unrestrict wR1MxOWuPlqxdYcwVI1vaTwwlLkPFXrL0YKSbS5TS0r3aCWHr3ox4BWqSGk0QTf

