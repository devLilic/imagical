<?php

function data($part){
    $data = [
        'slugs' => "<UL>
<LI><A HREF=#GENERIC  IN>GENERIC IN</A>
<LI><A HREF=#HEADLINES-INTRO>HEADLINES-INTRO</A>
<LI><A HREF=#HEADLINES-BETA>HEADLINES-BETA</A>
<LI><A HREF=#TEST LINE-INTRO>TEST LINE-INTRO</A>
<LI><A HREF=#TEST LINE-BETA>TEST LINE-BETA</A>
<LI><A HREF=#MD LIVE NATALIA-INTRO>MD LIVE NATALIA-INTRO</A>
<LI><A HREF=#MD LIVE NATALIA-BETA>MD LIVE NATALIA-BETA</A>
<LI><A HREF=#MD PROIECT ODIMM OFF-INTRO>MD PROIECT ODIMM OFF-INTRO</A>
<LI><A HREF=#MD PROIECT ODIMM OFF-SNC>MD PROIECT ODIMM OFF-SNC</A>
<LI><A HREF=#MD PROIECT ODIMM OFF-OFF>MD PROIECT ODIMM OFF-OFF</A>
<LI><A HREF=#TEASE ALARMA 2 AEROPORT>TEASE ALARMA 2 AEROPORT</A>
<LI><A HREF=#MD MAI REFUGIATI-INTRO>MD MAI REFUGIATI-INTRO</A>
<LI><A HREF=#MD MAI REFUGIATI-BETA>MD MAI REFUGIATI-BETA</A>
<LI><A HREF=#MD ALARMA 2 AEROPORT-INTRO>MD ALARMA 2 AEROPORT-INTRO</A>
<LI><A HREF=#MD ALARMA 2 AEROPORT-BETA>MD ALARMA 2 AEROPORT-BETA</A>
<LI><A HREF=#PA-INTRO>PA-INTRO</A>
<LI><A HREF=#GENERIC OUT>GENERIC OUT</A>
<LI><A HREF=#RO DUPLEX FORD CRAIOVA-INTRO>RO DUPLEX FORD CRAIOVA-INTRO</A>
<LI><A HREF=#RO DUPLEX FORD CRAIOVA-BETA>RO DUPLEX FORD CRAIOVA-BETA</A>
</UL>",
        'intro' => '<FONT 000000 SIZE=-2><A HREF=#StoryIndex>Return to index of stories...</FONT></A><BR CLEAR=LEFT>
<HR></DIV>
<A NAME=TEST LINE-INTRO>
<H3>TEST LINE-INTRO</H3><BR></DIV><DIV DIR=LTR>
<P>Test line text


<FONT 000000 SIZE=-2><A HREF=#StoryIndex>Return to index of stories...</FONT></A><BR CLEAR=LEFT>
',
        'beta' => '<FONT 000000 SIZE=-2><A HREF=#StoryIndex>Return to index of stories...</FONT></A><BR CLEAR=LEFT>
<HR></DIV>
<A NAME=TEST LINE-BETA>
<H3>TEST LINE-BETA</H3><BR></DIV><DIV DIR=LTR>
<P>TEST LINE
<P>TEST LINE TITLU
<P>INTRO
<P>Test line text


<FONT 000000 SIZE=-2><A HREF=#StoryIndex>Return to index of stories...</FONT></A><BR CLEAR=LEFT>
',
        'off' => '<FONT 000000 SIZE=-2><A HREF=#StoryIndex>Return to index of stories...</FONT></A><BR CLEAR=LEFT>
<HR></DIV>
<A NAME=MD PROIECT ODIMM OFF-OFF>
<H3>MD PROIECT ODIMM OFF-OFF</H3><BR></DIV><DIV DIR=LTR>
<P>MD PROIECT ODIMM OFF+SNC
<P>TITLU NOI OPORTUNIT????I PENTRU TINERI
<P>INTRO
<P>Tinerii care vor s??-??i dezvolte o afacere ??n Republica Moldova pot beneficia de un nou proiect de finan??are. Programul "Start pentru tineri" le va oferi  antreprenorilor ??n devenire facilit????i de extindere ??i granturi de p??n?? la 200 de mii de lei, precum ??i credite.
<P>SINCRON DUMITRU P??NTEA, director interimar ODIMM
<P>361
<P>1:02-1:23 Unde valoarea creditului este de p??n?? la 1,5 milioane de lei, iar grantul cu o propor??ie de 15%. Trebuie s?? men??ionez c?? creditul acordat este cel mai facil ??i accesibil instrument care exist?? ??n sistemul nostru bancar.
<P>Text Programul "Start pentru tineri" este sus??inut de Guvernul Republicii Moldova pe o perioad?? de trei ani, cu posibilitatea de a fi prelungit. Pentru sus??inerea celor aproximativ 100 de afaceri a fost alocat?? suma de 20 de milioane de lei.
<P>REDACTOR: LILIA ??URCANU


<FONT 000000 SIZE=-2><A HREF=#StoryIndex>Return to index of stories...</FONT></A><BR CLEAR=LEFT>
'
    ];

    return $data[$part];
}
