import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung gemäß DSGVO – Informationen zur Verarbeitung personenbezogener Daten bei Szeder Coaching.",
  alternates: { canonical: "/datenschutz" },
};

// ⚠️ Vor dem Launch die gelb markierten Platzhalter ([…]) ersetzen:
// Adresse der Verantwortlichen sowie Name/Anschrift des Hosting-Anbieters.
export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Der Schutz Ihrer personenbezogenen Daten ist mir ein wichtiges Anliegen. Nachfolgend informiere ich Sie über die Verarbeitung Ihrer Daten im Rahmen dieser Website."
      lastUpdated="Juni 2026"
    >
      <h2>1. Verantwortliche</h2>
      <p>Verantwortliche für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO):</p>
      <address>
        <strong>Eszter Bary</strong> – Szeder Coaching
        <br />
        Krensdorferstraße 10
        <br />
        7024 Hirm, Österreich
        <br />
        E-Mail: <a href="mailto:eszterbary@szedercoaching.at">eszterbary@szedercoaching.at</a>
        <br />
        Telefon: <a href="tel:+4367761526206">+43 677 6152 6206</a>
      </address>

      <h2>2. Allgemeines</h2>
      <p>
        Ich verarbeite personenbezogene Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO,
        österreichisches Datenschutzgesetz – DSG, Telekommunikationsgesetz – TKG 2021). In dieser Datenschutzerklärung
        informiere ich Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen dieser Website.
      </p>

      <h2>3. Aufruf der Website und Server-Logfiles</h2>
      <p>
        Beim Aufrufen dieser Website werden durch den Hosting-Anbieter automatisch Informationen in sogenannten
        Server-Logfiles gespeichert, die Ihr Browser übermittelt. Dazu zählen insbesondere: IP-Adresse, Datum und
        Uhrzeit des Zugriffs, die abgerufene Seite, Browsertyp und -version, das Betriebssystem sowie die zuvor besuchte
        Seite (Referrer).
      </p>
      <p>
        Diese Daten dienen der technischen Bereitstellung, Stabilität und Sicherheit der Website. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und stabilen Betrieb).
      </p>
      <p>
        Hosting-Anbieter: Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Mit dem Anbieter besteht ein
        Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Eine Verarbeitung personenbezogener Daten kann dabei auch in
        den USA erfolgen; diese stützt sich auf die EU-Standardvertragsklauseln (Art. 46 DSGVO).
      </p>

      <h2>4. Kontaktaufnahme über das Kontaktformular</h2>
      <p>
        Wenn Sie über das Kontaktformular oder per E-Mail mit mir in Kontakt treten, werden Ihre Angaben (Name,
        E-Mail-Adresse und Nachricht) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet. Das Kontaktformular speichert
        keine Daten auf dem Server dieser Website, sondern öffnet Ihr eigenes E-Mail-Programm und versendet die Nachricht
        an meine E-Mail-Adresse.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen) bzw. Art. 6 Abs. 1 lit.
        f DSGVO (Beantwortung Ihrer Anfrage). Ihre Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist
        und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>5. E-Mail-Versand (Gmail / Google)</h2>
      <p>
        Meine E-Mail-Adresse wird über den Dienst Gmail der Google Ireland Limited (Gordon House, Barrow Street, Dublin
        4, Irland) betrieben. Bei einer Kontaktaufnahme per E-Mail werden die von Ihnen übermittelten Daten daher auch
        durch Google verarbeitet. Nähere Informationen finden Sie in der Datenschutzerklärung von Google:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          policies.google.com/privacy
        </a>
        .
      </p>

      <h2>6. Cookies</h2>
      <p>
        Diese Website verwendet keine Tracking- oder Analyse-Cookies. Es werden ausschließlich technisch notwendige
        Daten verarbeitet, die für den Betrieb der Website erforderlich sind. Ein Cookie-Banner ist daher nicht
        erforderlich.
      </p>

      <h2>7. Schriftarten (Self-Hosting)</h2>
      <p>
        Die auf dieser Website verwendeten Schriftarten werden lokal vom Server ausgeliefert. Es besteht keine
        Verbindung zu Servern von Google Fonts oder anderen Dritten; dabei werden keine Daten an Dritte übertragen.
      </p>

      <h2>8. Analyse- und Tracking-Tools</h2>
      <p>
        Auf dieser Website kommen keine Webanalyse-Dienste, kein Tracking und keine Social-Media-Plug-ins zum Einsatz.
      </p>

      <h2>9. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
        Sie am „https://“ in der Adresszeile Ihres Browsers.
      </p>

      <h2>10. Ihre Rechte</h2>
      <p>Hinsichtlich Ihrer personenbezogenen Daten stehen Ihnen folgende Rechte zu:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur Ausübung Ihrer Rechte
        genügt eine formlose Nachricht an die oben genannte E-Mail-Adresse.
      </p>

      <h2>11. Beschwerderecht</h2>
      <p>
        Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, haben Sie das
        Recht, sich bei einer Aufsichtsbehörde zu beschweren. In Österreich ist dies die Österreichische
        Datenschutzbehörde, Barichgasse 40–42, 1030 Wien,{" "}
        <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">
          dsb.gv.at
        </a>
        .
      </p>

      <h2>12. Aktualität dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung hat den Stand Juni 2026. Durch die Weiterentwicklung der Website oder aufgrund
        geänderter gesetzlicher Vorgaben kann es notwendig werden, sie anzupassen.
      </p>
    </LegalPage>
  );
}
