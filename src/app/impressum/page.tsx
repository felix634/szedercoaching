import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Offenlegung gemäß § 5 ECG und § 25 Mediengesetz – Szeder Coaching, Eszter Bary.",
  alternates: { canonical: "/impressum" },
};

// ⚠️ Vor dem Launch die gelb markierten Platzhalter ([…]) durch die echten
// Daten ersetzen: Adresse, Gewerbeangaben, ggf. UID-Nummer, Telefonnummer prüfen.
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" lastUpdated="Juni 2026">
      <h2>Offenlegung gemäß § 5 ECG und § 25 Mediengesetz</h2>
      <p>Medieninhaberin, Diensteanbieterin und für den Inhalt verantwortlich:</p>
      <address>
        <strong>Eszter Bary</strong>
        <br />
        Szeder Coaching
        <br />
        Krensdorferstraße 10
        <br />
        7024 Hirm
        <br />
        Österreich
      </address>

      <h2>Kontakt</h2>
      <ul>
        <li>
          Telefon: <a href="tel:+4367761526206">+43 677 6152 6206</a>
        </li>
        <li>
          E-Mail: <a href="mailto:eszter.joga@gmail.com">eszter.joga@gmail.com</a>
        </li>
        <li>
          Web: <a href="https://www.szedercoaching.at">www.szedercoaching.at</a>
        </li>
      </ul>

      <h2>Tätigkeit</h2>
      <p>
        Diese Website informiert über das Angebot von Eszter Bary im Bereich Schwimmcoaching,
        Wassergewöhnung und Angstabbau im Wasser – die einfühlsame Begleitung von Kindern und
        Erwachsenen, auch mit besonderen Bedürfnissen.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
        Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieterin bin ich für eigene
        Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website kann Links zu externen Websites Dritter enthalten, auf deren Inhalte ich keinen Einfluss habe. Für
        die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei
        Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend entfernt.
      </p>

      <h2>Urheberrecht und Bildnachweis</h2>
      <p>
        Die auf dieser Website veröffentlichten Texte und Fotos unterliegen dem österreichischen Urheberrecht. Eine
        Verwendung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung.
      </p>
      <p>
        Die Fotos stammen aus eigenem Bestand. Abgebildete Personen haben der Veröffentlichung zugestimmt; bei
        abgebildeten Minderjährigen liegt die Einwilligung der Erziehungsberechtigten vor.
      </p>
    </LegalPage>
  );
}
